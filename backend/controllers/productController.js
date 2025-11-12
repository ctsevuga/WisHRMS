import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

const getProducts = asyncHandler(async (req, res) => {
  try {
    // Fetch only active products
    const products = await Product.find({ isActive: true });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error while fetching products" });
  }
});

const getInactiveProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ isActive: false });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching inactive products:", error.message);
    res
      .status(500)
      .json({ message: "Server error while fetching inactive products" });
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
    let { price, isActive } = req.body;

    // Validate and sanitize price
    price = Number(price);
    if (isNaN(price) || price < 0) {
      return res.status(400).json({ error: "Valid price is required." });
    }

    // Validate isActive (if provided)
    if (isActive !== undefined && typeof isActive !== "boolean") {
      return res
        .status(400)
        .json({ error: "`isActive` must be a boolean (true or false)." });
    }

    // Find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Update fields
    product.Price = price;
    if (isActive !== undefined) {
      product.isActive = isActive;
    }

    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ error: "Server error." });
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
  getInactiveProducts,
  createProduct,
  getProductById,
  updateProductPrice,
  deleteProduct,
};