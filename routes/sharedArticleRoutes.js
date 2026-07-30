import express from "express";
import {
  shareArticle,
  getMySharedArticles,
  removeSharedArticle,
} from "../controllers/sharedArticleController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Share an article
router.post("/", authMiddleware , shareArticle);

// Get all articles shared by current user
router.get("/my", authMiddleware , getMySharedArticles);

// Remove shared article
router.delete("/:id", authMiddleware , removeSharedArticle);

export default router;