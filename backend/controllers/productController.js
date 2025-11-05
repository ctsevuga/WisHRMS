import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
      

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching ledgers:', error.message);
    res.status(500).json({ message: 'Server error while fetching ledgers' });
  }
});

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { product, price} = req.body;

    const newProduct = new Product({
     Product:product ,
      Price:price
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating ledger:', error.message);
    res.status(500).json({ message: 'Server error while creating ledger.' });
  }
});
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400);
    throw new Error('Invalid product ID format');
  }

  const product = await Product.findById(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
const updateProductPrice = async (req, res) => {
  try {
    const { id } = req.params;
    let { price } = req.body;

    price = Number(price);
    if (isNaN(price) || price < 0) {
      return res.status(400).json({ error: 'Valid price is required.' });
    }

    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    product.Price = price;
    await product.save();
    
    return res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product price:', error);
    return res.status(500).json({ error: 'Server error.' });
  }
};
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400);
      throw new Error('Invalid product ID format');
    }

    const product = await Product.findById(id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    await product.deleteOne();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ message: 'Server error while deleting product.' });
  }
});



export {
  getProducts,
  createProduct,
  getProductById,
  updateProductPrice,
  deleteProduct,
};