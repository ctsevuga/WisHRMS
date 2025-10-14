import express from "express";
import {
  createVouchers,
  getVouchers,
  getLedgerFilters,
  getVoucherById,
  deleteVoucher,
  triggerTrialBalance,
  triggerBalanceSheet,
  triggerProfitAndLoss,
} from "../controllers/voucherController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/voucher_create").post(protect, createVouchers);
router.post("/trial_balance", triggerTrialBalance);
router.post('/balance-sheet', triggerBalanceSheet);
router.post('/profit-loss', triggerProfitAndLoss);
// Route: GET /api/vouchers
router.get("/", getVouchers);

// Route: GET /api/vouchers/filters
router.get("/filters", getLedgerFilters);
router.get("/voucher/:id", getVoucherById);
router.route("/:id").delete(protect, deleteVoucher);

export default router;
