import express from "express";
import {
 getWorkingDays,
} from "../controllers/monthController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").get(getWorkingDays);


export default router;