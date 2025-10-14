import mongoose from "mongoose";
import dotenv from "dotenv";
import employees from "./data/employees.js";
import Employee from "./models/employeeModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Employee.insertMany(employees);
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    process.exit(1);
  }
};

importData();
