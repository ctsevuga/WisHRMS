import express from 'express';
import {
  getProducts,
  createProduct,
  getProductById,
  updateProductPrice,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();


router.route('/list_All').get(protect,getProducts);
router.post('/', createProduct);
router.get('/products/:id', getProductById);
router.put('/products/:id/price', updateProductPrice);
router.delete('/products/:id', deleteProduct);


export default router;
