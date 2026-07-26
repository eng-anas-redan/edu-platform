import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
 createReport,
 getReports,
 updateReportStatus
} from "../controllers/reportController.js"

const router = express.Router();


router.post("/",
  authMiddleware,
  createReport);

router.get("/",
  authMiddleware,
  roleMiddleware("admin"),
  getReports);

router.put("/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateReportStatus);


export default router;