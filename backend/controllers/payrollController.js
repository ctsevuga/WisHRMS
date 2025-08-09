import asyncHandler from "../middleware/asyncHandler.js";
import Salary from "../models/salaryModel.js";
import Payroll from "../models/payrollModel.js";
import Attendance from "../models/attendanceModel.js";
import Month from "../models/monthModel.js";

const generatePayroll = asyncHandler(async (req, res) => {
  
  const { salaryId, month, year } = req.body;
  try {
    const salary = await Salary.findById(salaryId);

    if (!salary) return res.status(404).json({ error: "Salary not found" });
    const empId = salary.empId;
    const name = salary.name;
    const grossSalary = salary.grossSalary;
    const netSalary = salary.netSalary;
    const monthyear = await Month.findOne({ year, month });
    const workingDays = monthyear.totalWorkingDays;
    console.log(workingDays);
    const attendanceRecords = await Attendance.find({
      empId: empId,
      month,
      year,
    });

    const paidDays = attendanceRecords.filter((a) =>
      ["Present", "Leave"].includes(a.status)
    ).length;

    const perDaySalary = netSalary / workingDays;
    const grossEarnings = perDaySalary * paidDays;
    const totalDeductions = perDaySalary * (workingDays - paidDays);
    const netPay = grossEarnings - totalDeductions;

    const payroll = new Payroll({
      empId,
      name,
      month,
      year: Number(year),
      workingDays,
      paidDays,
      grossSalary,
      netSalary,
      totalDeductions,
      netPay: parseFloat(netPay.toFixed(2)),
      paymentStatus: "Generated",
      paymentDate: null,
      generatedOn: new Date(),
    });

    try {
      await payroll.save();
    } catch (error) {
      console.error("Error saving payroll:", error.message);
      console.error(error.stack);
    }

    res.status(201).json(payroll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const generatePayrollForAll = asyncHandler(async (req, res) => {
  const { month, year } = req.body;

  try {
    const monthyear = await Month.findOne({ year, month });
    if (!monthyear)
      return res.status(404).json({ error: "Month data not found" });

    const workingDays = monthyear.totalWorkingDays;

    const allSalaries = await Salary.find({});
    if (!allSalaries || allSalaries.length === 0) {
      return res.status(404).json({ error: "No salary records found" });
    }

    const payrolls = [];

    for (const salary of allSalaries) {
      const empId = salary.empId;
      const name = salary.name;
      const grossSalary = salary.grossSalary;
      const netSalary = salary.netSalary;

      const attendanceRecords = await Attendance.find({
        empId,
        month,
        year,
      });

      const paidDays = attendanceRecords.filter((a) =>
        ["Present", "Leave"].includes(a.status)
      ).length;

      const perDaySalary = netSalary / workingDays;
      const grossEarnings = perDaySalary * paidDays;
      const totalDeductions = perDaySalary * (workingDays - paidDays);
      const netPay = grossEarnings - totalDeductions;

      const payroll = new Payroll({
        empId,
        name,
        month,
        year: Number(year),
        workingDays,
        paidDays,
        grossSalary,
        netSalary,
        totalDeductions,
        netPay: parseFloat(netPay.toFixed(2)),
        paymentStatus: "Generated",
        paymentDate: null,
        generatedOn: new Date(),
      });

      try {
        await payroll.save();
        payrolls.push(payroll);
      } catch (error) {
        console.error(`Error saving payroll for ${empId}:`, error.message);
      }
    }

    res.status(201).json({
      message: "Payroll generated for all employees",
      count: payrolls.length,
      payrolls,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const getPayrolls = asyncHandler(async (req, res) => {
  const payrolls = await Payroll.find({});
  res.json(payrolls);
});

const deletePayroll = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id);

  if (payroll) {
    await Payroll.deleteOne({ _id: payroll._id });
    res.json({ message: "Payroll removed" });
  } else {
    res.status(404);
    throw new Error("Payroll not found");
  }
});

const updatePayroll = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id);

  if (payroll) {
    payroll.paymentDate = Date.now();
    payroll.paymentStatus = "Paid";

    const updatedPayroll = await payroll.save();

    res.json(updatedPayroll);
  } else {
    res.status(404);
    throw new Error("Payrol not found");
  }
});
const getPayrollById = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id);

  if (payroll) {
    res.json(payroll);
  } else {
    res.status(404);
    throw new Error("Payroll not found");
  }
});
const updateAllPayrolls = asyncHandler(async (req, res) => {
  const { year, month } = req.body;

  if (!year || !month) {
    return res
      .status(400)
      .json({ message: "Both year and month are required." });
  }

  const currentDate = new Date();

  const result = await Payroll.updateMany(
    {
      year: year,
      month: month, // assuming exact match like "June"
    },
    {
      $set: {
        paymentDate: currentDate,
        paymentStatus: "Paid",
      },
    }
  );

  res.status(200).json({
    message: `Payroll records for ${month} ${year} updated successfully`,
    matchedCount: result.matchedCount,
    modifiedCount: result.modifiedCount,
  });
});
const getMyPayslips = asyncHandler(async (req, res) => {
  console.log(req.params.empId);
  const payrolls = await Payroll.find({ empId: req.params.empId });
  if (payrolls) {
    res.json(payrolls);
  } else {
    res.status(404);
    throw new Error("Payrolls are  not found");
  }
});
const getPayrollDetail = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id);

  if (payroll) {
    res.json(payroll);
  } else {
    res.status(404);
    throw new Error("Payroll not found");
  }
});

export {
  generatePayroll,
  generatePayrollForAll,
  getPayrolls,
  deletePayroll,
  updatePayroll,
  getPayrollById,
  updateAllPayrolls,
  getMyPayslips,
  getPayrollDetail,
};
