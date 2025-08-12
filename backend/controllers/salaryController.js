import asyncHandler from "../middleware/asyncHandler.js";
import Salary from "../models/salaryModel.js";
import Parameter from "../models/ParametersModel.js";

const createSalary = async (req, res) => {
  try {
    const { empId, name, basic, effectiveFrom, effectiveTo } = req.body;

    const existingSalary = await Salary.findOne({ empId });
    if (existingSalary) {
      return res
        .status(409)
        .json({ message: "Salary record for this employee already exists" });
    }

    // Get the latest parameters (assuming there's only one document)
    const parameters = await Parameter.findOne();
    if (!parameters) {
      return res.status(404).json({ message: "Salary parameters not found" });
    }

    // Extract parameter values
    const {
      HRA = 0,
      OtherAllowances = 0,
      PFEmployeeContribution,
      ESI,
      Tax,
    } = parameters;

    // Calculate components
    const hra = (HRA / 100) * basic;
    const otherAllowances = (OtherAllowances / 100) * basic;
    const conveyance = 1600; // Assume a fixed monthly conveyance allowance
    const pf = (PFEmployeeContribution / 100) * basic;
    const esi = (ESI / 100) * basic;
    const tax = (Tax / 100) * basic;

    const grossSalary = basic + hra + conveyance + otherAllowances;
    const totalDeductions = pf + esi + tax;
    const netSalary = grossSalary - totalDeductions;

    // Create salary document with computed fields
    const salary = new Salary({
      empId,
      name,
      basic,
      hra,
      conveyance,
      otherAllowances,
      pf,
      esi,
      tax,
      grossSalary,
      netSalary,
      effectiveFrom,
      effectiveTo,
    });

    await salary.save();

    return res.status(201).json({
      message: "Salary record created successfully",
      data: salary,
    });
  } catch (error) {
    console.error("Error creating salary record:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSalries = asyncHandler(async (req, res) => {
  const salaries = await Salary.find({});
  // console.log(salaries);
  res.json(salaries);
});
const deleteSalary = asyncHandler(async (req, res) => {
  const salary = await Salary.findById(req.params.id);

  if (salary) {
    await Salary.deleteOne({ _id: salary._id });
    res.json({ message: "Salary removed" });
  } else {
    res.status(404);
    throw new Error("Salary not found");
  }
});
const getSalaryById = asyncHandler(async (req, res) => {
  const salary = await Salary.findById(req.params.id);

  if (salary) {
    res.json(salary);
  } else {
    res.status(404);
    throw new Error("Salary not found");
  }
});
const updateSalary = asyncHandler(async (req, res) => {
  const salary = await Salary.findById(req.params.id);

  if (!salary) {
    res.status(404);
    throw new Error("Salary not found");
  }

  // Update basic info
  salary.basic = req.body.basic || salary.basic;
  salary.effectiveFrom = req.body.effectiveFrom || salary.effectiveFrom;
  salary.effectiveTo = req.body.effectiveTo || salary.effectiveTo;

  // Fetch parameter percentages
  const parameters = await Parameter.findOne();
  if (!parameters) {
    res.status(500);
    throw new Error("Salary parameters not found");
  }

  const {
    HRA = 0,
    OtherAllowances = 0,
    PFEmployeeContribution,
    ESI,
    Tax,
  } = parameters;

  // Recalculate based on updated basic
  salary.hra = (HRA / 100) * salary.basic;
  salary.otherAllowances = (OtherAllowances / 100) * salary.basic;
  salary.conveyance = 1600; // Fixed conveyance
  salary.pf = (PFEmployeeContribution / 100) * salary.basic;
  salary.esi = (ESI / 100) * salary.basic;
  salary.tax = (Tax / 100) * salary.basic;

  salary.grossSalary =
    salary.basic + salary.hra + salary.conveyance + salary.otherAllowances;

  const totalDeductions = salary.pf + salary.esi + salary.tax;
  salary.netSalary = salary.grossSalary - totalDeductions;

  const updatedSalary = await salary.save();

  res.json({
    _id: updatedSalary._id,
    name: updatedSalary.name,
    empId: updatedSalary.empId,
    basic: updatedSalary.basic,
    hra: updatedSalary.hra,
    conveyance: updatedSalary.conveyance,
    otherAllowances: updatedSalary.otherAllowances,
    pf: updatedSalary.pf,
    esi: updatedSalary.esi,
    tax: updatedSalary.tax,
    grossSalary: updatedSalary.grossSalary,
    netSalary: updatedSalary.netSalary,
    effectiveFrom: updatedSalary.effectiveFrom,
    effectiveTo: updatedSalary.effectiveTo,
  });
});

const getMySalary = asyncHandler(async (req, res) => {
  console.log(req.params.empId);

  const salary = await Salary.findOne({
    empId: req.params.empId,
   
  });

  if (salary) {
    res.json(salary);
  } else {
    res.status(404);
    throw new Error("Salary is  not found");
  }
});

export { createSalary,
  getSalries,
  deleteSalary,
  getSalaryById,
  updateSalary,
  getMySalary,
 };
