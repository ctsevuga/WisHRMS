import asyncHandler from "../middleware/asyncHandler.js";
import Month from "../models/monthModel.js";
import Employee from "../models/employeeModel.js";


const getWorkingDays = asyncHandler(async (req, res) => {
  const months = await Month.find({});
  res.json(months);
});



export {
  getWorkingDays,
};