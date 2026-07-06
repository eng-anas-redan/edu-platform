import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    bio: {
      type: String,
    },

    specialty: {
    type: String,
    required: true,
    },
    experience: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ID card + certificates
    documents: {
      idCard: {
        front: {
          type: String,
          required: true,
        },
        back: {
          type: String,
          required: true,
        },
      },
      certificate: {
        type: String,
        required: true,
      },
      otherDocuments: [
        {
          type: String,
        },
      ],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectionReason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const VerificationRequest = mongoose.model(
  "VerificationRequest",
  requestSchema,
);

export default VerificationRequest;
