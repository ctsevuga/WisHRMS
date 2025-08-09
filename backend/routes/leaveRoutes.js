import express from "express";
import {
  createLeave,
  getAllLeaves,
  getMyLeaves,
  getLeaveById,
  updateLeaveStatus,
  deleteLeave,
  getmyLeaveConfig,
} from "../controllers/leaveController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, createLeave);
router.delete("/:id", protect, deleteLeave);
router.put("/:id", protect, admin, updateLeaveStatus);
router.get("/", protect, admin, getAllLeaves);
router.route("/:empId").get(protect, getMyLeaves);
router.route("/status/:id").get(protect, getLeaveById);
router.route("/myconfiguration/leave").get(protect, getmyLeaveConfig);

// router
//   .route("/:id")
//   .delete(protect, deleteLeave)
//   .get(protect, admin, getLeaveById)
//   .put(protect, admin, updateLeaveStatus);

 

export default router;
