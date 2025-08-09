import express from "express";
import {
 generatePayroll,
 generatePayrollForAll,
 getPayrolls,
 deletePayroll,
 updatePayroll,
 getPayrollById,
 updateAllPayrolls,
 getMyPayslips,
 getPayrollDetail,
} from "../controllers/payrollController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/:empId").get(protect, getMyPayslips);
router
  .route('/detail/:id')
  .get(protect, getPayrollDetail)
router.post('/',protect, admin, generatePayroll);
router.post('/all',protect, admin, generatePayrollForAll);
router.get('/',protect, admin, getPayrolls);
router.put('/all',protect, admin, updateAllPayrolls);
router
  .route('/admin/:id')
  .get(protect, admin, getPayrollById)
router
  .route('/:id')
  .delete(protect, admin, deletePayroll)
router
  .route('/:id')
  .put(protect, admin, updatePayroll)  

  

  

// router
//   .route('/:id')
//   .get( getPayrollById)

export default router;