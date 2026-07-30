import express from "express";
import {
  createArticle,
  updateArticle,
  getArticles,
  getFeed,
  getSingleArticle,
  getArticlesByUserId,
  deleteArticle,
  toggleLikeArticle,
  getAllTags
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
router.get("/", authMiddleware , getArticles);
router.get("/shared-articles" ,authMiddleware , getFeed);
router.get("/user/:id",authMiddleware , getArticlesByUserId);
router.get("/tags", getAllTags);
router.get("/:id",authMiddleware, getSingleArticle);
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
