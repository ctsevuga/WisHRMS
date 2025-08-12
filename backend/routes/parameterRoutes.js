import express from 'express';
import {
  createParameter,
  getParameters,
  getParameterById,
  updateParameter,
  deleteParameter,
} from '../controllers/parameterController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all parameters, POST to create new
router
  .route('/')
  .get(protect, admin, getParameters)
  .post(protect, admin, createParameter);

// GET single parameter, PUT to update, DELETE to remove
router
  .route('/:id')
  .get(protect, admin, getParameterById)
  .put(protect, admin, updateParameter)
  .delete(protect, admin, deleteParameter);

export default router;
