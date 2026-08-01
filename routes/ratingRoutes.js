import express from "express";
import {
  rateTeacher,
  getTeacherRating,
} from "../controllers/ratingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, rateTeacher);

router.get("/:teacherId", authMiddleware, getTeacherRating);

export default router;