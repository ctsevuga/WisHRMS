import mongoose from "mongoose";
import Parameter from "../models/ParametersModel.js";

const salarySchema = new mongoose.Schema(
  {
    empId: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    basic: {
      type: Number,
    },
    hra: {
      type: Number,
       default: 0,
    },
    conveyance: {
      type: Number,
       default: 0,
    },
    otherAllowances: {
      type: Number,
       default: 0,
    },
    pf: {
      type: Number,
       default: 0,
    },
    esi: {
      type: Number,
       default: 0,
    },
    tax: {
      type: Number,
       default: 0,
    },
    grossSalary: {
      type: Number,
    },
    netSalary: {
      type: Number,
    },
    effectiveFrom: {
      type: Date,
    },
    effectiveTo: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
salarySchema.pre("save", async function (next) {
  if (!this.basic) {
    // Basic salary must be present to calculate anything
    return next(new Error("Basic salary is required"));
  }

  try {
    // Fetch parameters - assuming only one parameters doc exists
    const parameters = await Parameter.findOne();

    if (!parameters) {
      return next(new Error("Parameter data not found"));
    }

    // Calculate salary components based on parameters (percentages)
    this.hra = this.basic * (parameters.HRA / 100);
    this.conveyance = this.basic * (parameters.Conveyances / 100);
    this.otherAllowances = this.basic * (parameters.OtherAllowances / 100);
    this.pf = this.basic * (parameters.PFEmployeeContribution / 100);
    this.esi = this.basic * (parameters.ESI / 100);
    this.tax = this.basic * (parameters.Tax / 100);

    // Calculate grossSalary
    this.grossSalary = this.basic + this.hra + this.conveyance + this.otherAllowances;

    // Calculate total deductions
    const totalDeductions = this.pf + this.esi + this.tax;

    // Calculate netSalary
    this.netSalary = this.grossSalary - totalDeductions;

    next();
  } catch (error) {
    next(error);
  }
});


const Salary = mongoose.model("Salary", salarySchema);

export default Salary;
