import mongoose from "mongoose";
import Rating from "../models/Rating.js";
import User from "../models/User.js";

export const rateTeacher = async (req, res) => {
  try {
    const { teacherId, rating } = req.body;
    const studentId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({
        message: "Invalid teacher id",
      });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const teacher = await User.findById(teacherId);

    if (!teacher || teacher.role !== "teacher") {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    if (teacher._id.toString() === studentId) {
      return res.status(400).json({
        message: "You can't rate yourself",
      });
    }

    const user = await User.findById(studentId);

    if (user.role !== "student") {
      return res.status(403).json({
        message: "Only students can rate teachers",
      });
    }

    const existingRating = await Rating.findOne({
      teacher: teacherId,
      student: studentId,
    });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();

      return res.status(200).json({
        message: "Rating updated successfully",
      });
    }

    await Rating.create({
      teacher: teacherId,
      student: studentId,
      rating,
    });

    res.status(201).json({
      message: "Rating added successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getTeacherRating = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({
        message: "Invalid teacher id",
      });
    }

    const stats = await Rating.aggregate([
      {
        $match: {
          teacher: new mongoose.Types.ObjectId(teacherId),
        },
      },
      {
        $group: {
          _id: "$teacher",
          averageRating: { $avg: "$rating" },
          ratingsCount: { $sum: 1 },
        },
      },
    ]);

    const averageRating =
      stats.length > 0 ? Number(stats[0].averageRating.toFixed(1)) : 0;

    const ratingsCount = stats.length > 0 ? stats[0].ratingsCount : 0;

    let myRating = null;

    if (req.user) {
      const userRating = await Rating.findOne({
        teacher: teacherId,
        student: req.user.id,
      });

      if (userRating) {
        myRating = userRating.rating;
      }
    }

    res.status(200).json({
      averageRating: Number(averageRating),
      ratingsCount,
      myRating,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
