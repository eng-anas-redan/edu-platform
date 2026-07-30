import SharedArticle from "../models/SharedArticle.js";
import Article from "../models/Article.js";

// Share Article
export const shareArticle = async (req, res) => {
  try {
    const { articleId } = req.body;
    const userId = req.user.id;

    // Check if article exists
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    // Prevent sharing your own article
    if (article.author.toString() === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot share your own article.",
      });
    }

    // Prevent duplicate share
    const alreadyShared = await SharedArticle.findOne({
      user: userId,
      article: articleId,
    });

    if (alreadyShared) {
      return res.status(400).json({
        success: false,
        message: "You have already shared this article.",
      });
    }

    const sharedArticle = await SharedArticle.create({
      user: userId,
      article: articleId,
    });

    res.status(201).json({
      success: true,
      message: "Article shared successfully.",
      sharedArticle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Shared Articles For Current User
export const getMySharedArticles = async (req, res) => {
  try {
    const userId = req.user.id;

    const sharedArticles = await SharedArticle.find({ user: userId })
      .populate({
        path: "article",
        populate: {
          path: "author",
          select: "fname lname profileImage",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      sharedArticles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Shared Article
export const removeSharedArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const sharedArticle = await SharedArticle.findOne({
      _id: id,
      user: userId,
    });

    if (!sharedArticle) {
      return res.status(404).json({
        success: false,
        message: "Shared article not found.",
      });
    }

    await sharedArticle.deleteOne();

    res.status(200).json({
      success: true,
      message: "Shared article removed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};