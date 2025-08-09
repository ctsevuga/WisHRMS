import asyncHandler from "../middleware/asyncHandler.js";
import Employee from "../models/employeeModel.js";

const createEmployee = asyncHandler(async (req, res) => {
  const {
    user,
    empId,
    name,
    gender,
    dob,
    joiningDate,
    department,
    designation,
    contact,
    address,
    accountNumber,
    ifscCode,
    bankName,
    isActive,
  } = req.body;
  console.log("user");

  console.log(user);

  await Employee.updateMany({ empId: empId }, { $set: { isActive: false } });

  const newEmployee = new Employee({
    user: user,
    empId,
    name,
    gender,
    dob,
    joiningDate,
    department,
    designation,
    contact,
    address,
    accountNumber,
    ifscCode,
    bankName,
    isActive,
  });
  const employee = await newEmployee.save();
  res.status(201).json(employee);
});
const getEmployee = asyncHandler(async (req, res) => {
  console.log(req.params.empId);

  const employee = await Employee.findOne({
    empId: req.params.empId,
    isActive: true,
  });

  if (employee) {
    res.json(employee);
  } else {
    res.status(404);
    throw new Error("Employee is  not found");
  }
});
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ isActive: true });
  res.json(employees);
});
const getEmployeesDetails = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ empId: req.params.empId });

  if (employees) {
    res.json(employees);
  } else {
    res.status(404);
    throw new Error("Employee details  not found");
  }
});
// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee) {
    res.json(employee);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee) {
    employee.Name = req.body.Name || employee.Name;
    employee.Regulation = req.body.Regulation || employee.Regulation;
    employee.Program = req.body.Program || employee.Program;
    employee.Batch = req.body.Batch || employee.Batch;
    employee.DOB = req.body.DOB || employee.DOB;
    employee.AadharNo = req.body.AadharNo || employee.AadharNo;
    employee.MobileNo = req.body.MobileNo || employee.MobileNo;
    employee.Community = req.body.Community || employee.Community;
    employee.NameInAadhar = req.body.NameInAadhar || employee.NameInAadhar;
    employee.AadharLinkedMobileNo =
      req.body.AadharLinkedMobileNo || employee.AadharLinkedMobileNo;
    employee.AadharLinkedMailID =
      req.body.AadharLinkedMailID || employee.AadharLinkedMailID;
    employee.FirstGraduate = req.body.FirstGraduate || employee.FirstGraduate;

    const updatedEmployee = await employee.save();

    res.json({
      _id: updatedEmployee._id,
      Name: updatedEmployee.Name,
      Regulation: updatedEmployee.Regulation,
      Program: updatedEmployee.Program,
      DOB: updatedEmployee.DOB,
      AadharNo: updatedEmployee.AadharNo,
      MobileNo: updatedEmployee.MobileNo,
      Community: updatedEmployee.Community,
      NameInAadhar: updatedEmployee.NameInAadhar,
      AadharLinkedMobileNo: updatedEmployee.AadharLinkedMobileNo,
      AadharLinkedMailID: updatedEmployee.AadharLinkedMailID,
      FirstGraduate: updatedEmployee.FirstGraduate,
      Quota: updatedEmployee.Quota,
      Transferred: updatedEmployee.Transferred,
      CurrentSemester: updatedEmployee.CurrentSemester,
    });
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

export {
  createEmployee,
  getEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  getEmployeesDetails,
};
