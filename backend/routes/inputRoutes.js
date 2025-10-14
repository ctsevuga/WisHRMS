import express from "express";
import {
  createInput,
  listInputs,
  deleteInput,
  getInputById,
  getAllInputBasic
  } from "../controllers/inputController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/input_create").post(protect, createInput);
router.route('/basic').get(protect,getAllInputBasic);
router.route('/').get(protect,listInputs);
router.get("/input/:id", getInputById);
router.route("/:id").delete(protect, deleteInput);

export default router;