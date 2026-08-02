import Article from "../models/Article.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import SharedArticle from "../models/SharedArticle.js";
import Comment from "../models/Comment.js";
import Report from "../models/Report.js";

export const createArticle = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and Content are required",
      });
    }
    const images = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    const article = await Article.create({
      title,
      content,
      tags,
      images,
      author: req.user.id,
    });
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    // التحقق من صاحب المقال
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to edit this article",
      });
    }
    // التعديل
    if (req.body.title !== undefined) {
      article.title = req.body.title;
    }
    if (req.body.content !== undefined) {
      article.content = req.body.content;
    }

    if (req.body.tags !== undefined) {
      article.tags = req.body.tags;
    }

    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getArticles = async (req, res) => {
  try {
    const userId = req.user.id;
    const { word, tag, author, sort } = req.query;
    const filter = {};
    // البحث
    if (word) {
      const users = await User.find({
        $or: [
          { fname: { $regex: word, $options: "i" } },
          { lname: { $regex: word, $options: "i" } },
        ],
      });
      const userIds = users.map((u) => u._id);
      filter.$or = [
        { title: { $regex: word, $options: "i" } },
        { tags: { $regex: word, $options: "i" } },
        { author: { $in: userIds } },
      ];
    }
    // فلترة حسب الـ Tag
    if (tag) {
      filter.tags = tag;
    }
    // فلترة حسب الكاتب
    if (author) {
      filter.author = author;
    }
    // الترتيب
    let sortOption = { createdAt: -1 };
    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }
    const articles = await Article.find(filter)
      .populate("author", "fname lname email")
      .sort(sortOption);

    const articlesWithShares = await Promise.all(
      articles.map(async (article) => {
        const sharedArticle = await SharedArticle.findOne({
          article: article._id,
          user: userId,
        });

        return {
          ...article.toObject(),
          isShared: !!sharedArticle,
          sharedArticleId: sharedArticle ? sharedArticle._id : null,
        };
      }),
    );

    const formattedArticles = articlesWithShares.map((article) => ({
      type: "article",
      createdAt: article.createdAt,
      article,
    }));

    res.json(formattedArticles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getFeed = async (req, res) => {
  try {
    const userId = req.user.id;

    const myShares = await SharedArticle.find({
      user: userId,
    }).select("article _id");

    const articles = await Article.find()
      .populate("author", "fname lname email")
      .sort({ createdAt: -1 });

    const sharedArticles = await SharedArticle.find()
      .populate("user", "fname lname")
      .populate({
        path: "article",
        populate: {
          path: "author",
          select: "fname lname email",
        },
      });

    const validSharedArticles = sharedArticles
      .filter((share) => share.article)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const feed = [
      ...articles.map((article) => {
        const myShare = myShares.find(
          (item) => item.article.toString() === article._id.toString(),
        );

        return {
          type: "article",
          createdAt: article.createdAt,
          article,

          isShared: !!myShare,
          sharedArticleId: myShare ? myShare._id : null,
        };
      }),

      ...validSharedArticles.map((share) => {
        const myShare = myShares.find(
          (item) => item.article.toString() === share.article._id.toString(),
        );

        return {
          type: "share",
          createdAt: share.createdAt,
          sharedBy: share.user,
          article: share.article,

          isShared: !!myShare,
          sharedArticleId: myShare ? myShare._id : null,
        };
      }),
    ];

    feed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(feed);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getArticlesByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user id",
      });
    }

    // مشاركات المستخدم الحالي لمعرفة Share / UnShare
    const myShares = await SharedArticle.find({
      user: currentUserId,
    }).select("article _id");

    const articles = await Article.find({ author: id })
      .populate("author", "fname lname email")
      .sort({ createdAt: -1 });

    const sharedArticles = await SharedArticle.find({ user: id })
      .populate("user", "fname lname")
      .populate({
        path: "article",
        populate: {
          path: "author",
          select: "fname lname email",
        },
      });

    const validSharedArticles = sharedArticles
      .filter((share) => share.article)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const feed = [
      ...articles.map((article) => {
        const myShare = myShares.find(
          (item) => item.article.toString() === article._id.toString(),
        );

        return {
          type: "article",
          createdAt: article.createdAt,
          article,

          isShared: !!myShare,
          sharedArticleId: myShare ? myShare._id : null,
        };
      }),

      ...validSharedArticles.map((share) => {
        const myShare = myShares.find(
          (item) => item.article.toString() === share.article._id.toString(),
        );

        return {
          type: "share",
          createdAt: share.createdAt,
          article: share.article,
          sharedBy: share.user,

          isShared: !!myShare,
          sharedArticleId: myShare ? myShare._id : null,
        };
      }),
    ];

    feed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(feed);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getSingleArticle = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid article id",
      });
    }
    const article = await Article.findById(id).populate(
      "author",
      "fname lname email",
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    // التحقق من صاحب المقال
    if (
      article.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "You are not allowed to delete this article",
      });
    }

    // حذف جميع المشاركات الخاصة بالمقال
    await SharedArticle.deleteMany({
      article: id,
    });

    // حذف جميع التعليقات الخاصة بالمقال
    await Comment.deleteMany({
      article: id,
    });
    // حذف جميع التعليقات الخاصة بالمستخدم
    await Comment.deleteMany({
      author: id,
    });

    // حذف جميع البلاغات الخاصة بالمقال
    await Report.deleteMany({
      article: id,
    });

    await article.deleteOne();
    res.json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
export const toggleLikeArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    // التحقق من وجود المقال
    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    // التحقق هل المستخدم عامل لايك مسبقًا
    const isLiked = article.likes.some(
      (userId) => userId.toString() === req.user.id,
    );

    if (isLiked) {
      // إزالة اللايك
      article.likes = article.likes.filter(
        (userId) => userId.toString() !== req.user.id,
      );
    } else {
      // إضافة لايك
      article.likes.push(req.user.id);
    }

    await article.save();

    res.status(200).json({
      success: true,
      liked: !isLiked,
      likesCount: article.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await Article.distinct("tags");

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
