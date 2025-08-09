import asyncHandler from "../middleware/asyncHandler.js";
import Configuration from "../models/configurationModel.js";
import Employee from "../models/employeeModel.js";

const allocateLeaveDays = asyncHandler(async (req, res) => {
  try {  
  const {  year, totalLeaveDays } = req.body;
  if (!year) {
      return res.status(400).json({ message: "Year is required" });
    }
   const employees = await Employee.find({isActive: true}, 'empId'); // Get all employee IDs 
   const bulkOperations = employees.map(emp => ({
      updateOne: {
        filter: { empId: emp.empId, year },
        update: {
          $setOnInsert: {
            empId:emp.empId,
            year,
            totalLeaveDays: totalLeaveDays,
            availableLeaveDays: totalLeaveDays,
            daysLeaveTaken: 0
          }
        },
        upsert: true // Only insert if not exists
      }
    }));
    if (bulkOperations.length === 0) {
      return res.status(404).json({ message: 'No employees found' });
    }
    const result = await Configuration.bulkWrite(bulkOperations);
    res.status(200).json({
      message: 'Leave days allocated successfully',
      result
    });
     } catch (error) {
    console.error('Error allocating leave days:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
const getConfigurations = asyncHandler(async (req, res) => {
  const configurations = await Configuration.find({});
  res.json(configurations);
});

const getUniqueYears = async (req, res) => {
  try {
    const years = await Configuration.distinct('year');
    res.status(200).json(years);
  } catch (error) {
    console.error('Error fetching unique years:', error);
    res.status(500).json({ message: 'Server error retrieving unique years' });
  }
};

export {
  allocateLeaveDays,
  getConfigurations,
  getUniqueYears,
};