import mongoose from "mongoose";

const sharedArticleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// منع مشاركة نفس المقال أكثر من مرة من نفس المستخدم
sharedArticleSchema.index(
  { user: 1, article: 1 },
  { unique: true }
);

export default mongoose.model("SharedArticle", sharedArticleSchema);