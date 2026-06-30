import express from "express";
import {
  createRequest,
  approveRequest,
  rejectRequest,
  getAllRequests,
} from "../controllers/requestController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// CREATE
router.post(
  "/requests",
  authMiddleware,
  upload.fields([
    { name: "idCardFront", maxCount: 1 },
    { name: "idCardBack", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
    { name: "otherDocuments", maxCount: 5 },
  ]),
  createRequest,
);

// READ
router.get(
  "/requests",
  authMiddleware,
  roleMiddleware("admin"),
  getAllRequests,
);

//APPROVED
router.put(
  "/requests/:id/approve",
  authMiddleware,
  roleMiddleware("admin"),
  approveRequest,
);

//REJECTED
router.put(
  "/requests/:id/reject",
  authMiddleware,
  roleMiddleware("admin"),
  rejectRequest,
);

export default router;