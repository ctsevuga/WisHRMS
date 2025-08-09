import express from "express";
import {
 
  createEmployee,
  getEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  getEmployeesDetails,
} from "../controllers/employeeController.js";
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post("/", createEmployee);
router.route('/:empId').get( getEmployee);
router.route('/').get(protect, admin, getEmployees);
router.route('/admin/:empId').get(protect, admin, getEmployeesDetails);

router
  .route('/admin/:id')
  .get(protect, admin, getEmployeeById)
  .put(protect, admin, updateEmployee);


export default router;
