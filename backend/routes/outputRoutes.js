import express from "express";
import {
  createOutput,
  getAllOutputs,
  getOutputById,
  deleteOutput
  } from "../controllers/outputController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/output_create").post(protect, createOutput);
router.route('/').get(protect,getAllOutputs);
router.get("/output/:id", getOutputById);
router.route("/:id").delete(protect, deleteOutput);
// router.route("/:id").delete(protect, deleteInput);

export default router;