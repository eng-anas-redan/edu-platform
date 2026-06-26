import express from "express";
import {
  createArticle,
  updateArticle,
  getAllArticles,
  getSingleArticle,
  deleteArticle,
  toggleLikeArticle,
} from "../controllers/articleController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// CREATE
router.post(
  "/articles",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  upload.array("images", 5),
  createArticle,
);

// READ
router.get("/articles", getAllArticles);
router.get("/articles/:id", getSingleArticle);

// UPDATE
router.put(
  "/articles/:id",
  authMiddleware,
  upload.array("images"),
  updateArticle,
);
router.put("/:id/like", authMiddleware, toggleLikeArticle);

// DELETE
router.delete("/articles/:id", authMiddleware, deleteArticle);
export default router;
