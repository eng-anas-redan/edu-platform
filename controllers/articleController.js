import Article from "../models/Article.js";
import mongoose from "mongoose";

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

    if (req.body.images !== undefined) {
      article.images = req.body.images;
    }

    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("author", "fname lname email")
      .sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getArticlesByUserId = async (req, res) => {
  try {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid article id",
      });
    }
    const articles = await Article.find({author : id})
      .populate("author", "fname lname email")
      .sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to delete this article",
      });
    }

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
