import express from "express";
import { 
    createSalary,
  getSalries,
  deleteSalary,
  getSalaryById,
  updateSalary, 
  getMySalary,
} from "../controllers/salaryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";


const router = express.Router();
router.route('/mine/:empId').get(protect, getMySalary);
router.post("/", protect, admin, createSalary);
router.get("/", protect, admin, getSalries);

router
  .route('/:id')
  .delete(protect, admin, deleteSalary)
  .get(protect, admin, getSalaryById)
  .put(protect, admin, updateSalary);
  

export default router;
