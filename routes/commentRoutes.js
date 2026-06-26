import express from "express";

import {
  createComment,
  getArticleComments,
  updateComment,
  deleteComment,
  getAllComments
} from "../controllers/commentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:articleId", authMiddleware, createComment);

router.get("/:articleId", getArticleComments);
router.get("/",getAllComments);

router.put("/:id", authMiddleware, updateComment);

router.delete("/:id", authMiddleware, deleteComment);

export default router;