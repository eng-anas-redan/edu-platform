import express from "express";
import {
  createArticle,
  updateArticle,
  getAllArticles,
  getSingleArticle,
  getArticlesByUserId,
  deleteArticle,
  toggleLikeArticle,
} from "../controllers/articleController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  upload.array("images", 5),
  createArticle,
);

// READ
router.get("/", getAllArticles);
router.get("/user/:id", getArticlesByUserId);
router.get("/:id", getSingleArticle);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  upload.array("images"),
  updateArticle,
);
router.put("/:id/like", authMiddleware, toggleLikeArticle);

// DELETE
router.delete("/:id", authMiddleware, deleteArticle);
export default router;
