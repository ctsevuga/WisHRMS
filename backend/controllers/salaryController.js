import asyncHandler from "../middleware/asyncHandler.js";
import Salary from "../models/salaryModel.js";

const createSalary = async (req, res) => {
  try {
    const {
      empId,
      name,
      basic,
      hra,
      conveyance,
      otherAllowances,
      pf,
      esi,
      tax,
      effectiveFrom,
      effectiveTo,
    } = req.body;

    const existingSalary = await Salary.findOne({ empId });
    if (existingSalary) {
      return res
        .status(409)
        .json({ message: "Salary record for this employee already exists" });
    }

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

  if (salary) {
    salary.basic = req.body.basic || salary.basic;
    salary.hra = req.body.hra || salary.hra;
    salary.conveyance = req.body.conveyance || salary.conveyance;
    salary.otherAllowances = req.body.otherAllowances || salary.otherAllowances;
    salary.pf = req.body.pf || salary.pf;
    salary.esi = req.body.esi || salary.esi;
    salary.tax = req.body.tax || salary.tax;
    salary.effectiveFrom = req.body.effectiveFrom || salary.effectiveFrom;
    salary.effectiveTo = req.body.effectiveTo || salary.effectiveTo;

    const updatedSalary = await salary.save();

    res.json({
      _id: updatedSalary._id,
      name: updatedSalary.name,
      empId: updatedSalary.empId,
      basic: updatedSalary.basic,
      hra: updatedSalary.hra,
      conveyance: updatedSalary.conveyance,
      otherAllowances: updatedSalary.otherAllowances,
      name: updatedSalary.name,
      empId: updatedSalary.empId,
      pf: updatedSalary.pf,
      esi: updatedSalary.esi,
      tax: updatedSalary.tax,
      effectiveFrom: updatedSalary.effectiveFrom,
      effectiveTo: updatedSalary.effectiveTo,
    });
  } else {
    res.status(404);
    throw new Error("Salary not found");
  }
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
