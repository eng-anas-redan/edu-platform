import Comment from "../models/Comment.js";
import Article from "../models/Article.js";

export const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { articleId } = req.params;

    // التحقق من وجود المقال
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    // التحقق من المحتوى
    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
    }

    // إنشاء التعليق
    const comment = await Comment.create({
      content: content.trim(),
      author: req.user.id,
      article: articleId,
    });

    // زيادة عدد التعليقات
    await Article.findByIdAndUpdate(articleId, {
      $inc: { commentsCount: 1 },
    });

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getArticleComments = async (req, res) => {
  try {
    const { articleId } = req.params;
    const comments = await Comment.find({
      article: articleId,
    })
      .populate("author", "fname lname email")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      results: comments.length,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    if (comment.author.toString() !== req.user.id &&
  req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit this comment",
      });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Content cannot be empty",
      });
    }
    comment.content = content.trim();
    await comment.save();
    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    if (
      comment.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }
    await Article.findByIdAndUpdate(comment.article, {
      $inc: { commentsCount: -1 },
    });
    await comment.deleteOne();
    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("author", "fname lname").populate("article","title")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};