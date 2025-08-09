import express from "express";
import {
  getAttendanceList,
  createAttendance,
  // getAttendanceDashboard,
  getTodayAttendences,
  createClockIn,
  updateClockOut,
  getMyAttendance,
  declareHoliday,
  getmonthAttences,
  convertYearFieldToNumber,
  //   getAttence,
  //   getMyAttendanceList,
  //   updateAttendance,
} from "../controllers/attendanceController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", createAttendance);
router.post("/clockin", createClockIn);
router.put("/clockOut", updateClockOut);
router.put("/year", convertYearFieldToNumber);

router.route("/").get(protect, admin, getAttendanceList);
// router.route("/dashboard").get(getAttendanceDashboard);
router.route("/today").get(protect, admin,getTodayAttendences);
router.route("/holiday").put(protect, admin,declareHoliday);
router.route("/:empId").get(protect, getMyAttendance);
router.route("/month").get(protect, admin,getmonthAttences);
export default router;
