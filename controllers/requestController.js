import VerificationRequest from "../models/VerificationRequest.js";
import User from "../models/User.js";

export const createRequest = async (req, res) => {
  try {
    const { bio, experience } = req.body;
    if (!experience) {
      return res.status(400).json({
        message: "years of experience are required",
      });
    }
    if (
      !req.files?.idCardFront ||
      !req.files?.idCardBack ||
      !req.files?.certificate
    ) {
      return res.status(400).json({
        message: "ID card (front & back) and certificate are required.",
      });
    }
    const existingRequest = await VerificationRequest.findOne({
      user: req.user.id,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "You already have a pending verification request.",
      });
    }
    const idCardFront = `/uploads/${req.files.idCardFront[0].filename}`;
    const idCardBack = `/uploads/${req.files.idCardBack[0].filename}`;
    const certificate = `/uploads/${req.files.certificate[0].filename}`;
    const otherDocuments =
      req.files.otherDocuments?.map((file) => `/uploads/${file.filename}`) ||
      [];

    const request = await VerificationRequest.create({
      bio,
      experience,
      documents: {
        idCard: {
          front: idCardFront,
          back: idCardBack,
        },
        certificate,
        otherDocuments,
      },
      user: req.user.id,
    });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const approveRequest = async (req, res) => {
  try {
    // التحقق أن المستخدم أدمن
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }

    const request = await VerificationRequest.findOneAndUpdate(
      {
        _id: req.params.id,
        status: "pending",
      },
      {
        status: "approved",
      },
      { new: true },
    );

    // تحويل المستخدم إلى مدرس
    if (!request) {
      return res.status(400).json({
        message: "Request not found or already reviewed",
      });
    }

    await User.findByIdAndUpdate(request.user, {
      role: "teacher",
    });

    res.status(200).json({
      message: "Request approved successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
export const rejectRequest = async (req, res) => {
  try {
    // التحقق أن المستخدم أدمن
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }

    const request = await VerificationRequest.findOneAndUpdate(
      {
        _id: req.params.id,
        status: "pending",
      },
      {
        status: "rejected",
        rejectionReason: req.body.rejectionReason,
      },
      { new: true },
    );
    if (!request) {
      return res.status(400).json({
        message: "Request not found or already reviewed",
      });
    }

    res.status(200).json({
      message: "Request rejected successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
export const getAllRequests = async (req, res) => {
  try {
    const requests = await VerificationRequest.find()
      .populate("user", "fname lname email")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};