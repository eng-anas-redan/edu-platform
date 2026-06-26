import express from "express"
import { getStats } from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//admin
router.get("/stats", authMiddleware, getStats);

export default router;