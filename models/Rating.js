import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

ratingSchema.index(
  {
    teacher: 1,
    student: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("Rating", ratingSchema);