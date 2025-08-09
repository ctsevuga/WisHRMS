import express from "express";
import {
  
  allocateLeaveDays,
  getUniqueYears,
 getConfigurations,
} from "../controllers/configurationController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").put(allocateLeaveDays);
router.route("/").get(getConfigurations);
router.route("/year").get(getUniqueYears);

export default router;