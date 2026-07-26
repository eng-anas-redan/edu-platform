import User from "../models/User.js";
import Article  from "../models/Article.js";
import Comment from "../models/Comment.js";
import Report from "../models/Report.js"
import VerificationRequest from "../models/VerificationRequest.js";

export const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const articles = await Article.countDocuments();
    const comments = await Comment.countDocuments();
    const reports = await Report.countDocuments();
    const verificationRequests = await VerificationRequest.countDocuments();

    res.status(200).json({
      users,
      articles,
      comments,
      verificationRequests,
      reports,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};