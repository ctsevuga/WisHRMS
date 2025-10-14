import mongoose from 'mongoose';
import dotenv from 'dotenv';

import users from './data/users.js';
import employees from './data/employees.js';
import User from './models/userModel.js';
import Employee from './models/employeeModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

// const importData = async () => {
  

//   User.insertMany(users)
//   .then(docs => {
//     console.log("Data inserted:", users);
//   })
//   .catch(err => {
//     console.error("InsertMany error:", err);
//   });

// };
const importData = async () => {
  try {
    // await Order.deleteMany();
    // await Product.deleteMany();
    // await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleEmployees = employees.map((employee) => {
      return { ...employee, user: adminUser };
    });

    await Employee.insertMany(sampleEmployees);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    // console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

importData();

