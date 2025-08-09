import mongoose from "mongoose";

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
salarySchema.pre('save', function (next) {
  this.grossSalary = this.basic + this.hra + this.conveyance + this.otherAllowances;
  const totalDeductions = this.pf + this.esi + this.tax;
  this.netSalary = this.grossSalary - totalDeductions;
  next();
});
const Salary = mongoose.model("Salary", salarySchema);

export default Salary;
