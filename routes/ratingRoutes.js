import express from "express";
import {
  rateTeacher,
  getTeacherRating,
  getAllRatings,
  deleteRating,
} from "../controllers/ratingController.js";
import authMiddleware  from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, rateTeacher);

router.get("/:teacherId", authMiddleware, getTeacherRating);

router.get("/", authMiddleware, roleMiddleware("admin") , getAllRatings);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteRating);

export default router;