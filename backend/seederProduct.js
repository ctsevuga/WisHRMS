import mongoose from "mongoose";
// import User from './models/userModel.js'; // compiled model
import dotenv from "dotenv";
import products from "./data/product.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {

    await Product.deleteMany();

    const createdproducts = await Product.insertMany(products);
console.log(`Inserted ${createdproducts.length} Products`);
    // console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

importData();
