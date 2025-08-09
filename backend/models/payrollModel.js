import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema(
  {
   empId: {
      type: Number,
    },
    name: {
      type: String,
      
    },
    month: {
      type: String,
    }, 
    year: {
      type: Number,
      // required: true,
    },
    workingDays: {
      type: Number,
      default: 0,
    },
    paidDays: {
      type: Number,
      default: 0,
    },
    grossSalary: {
      type: Number,
    },
    netSalary: {
      type: Number,
    },
     totalDeductions: {
      type: Number,
      default: 0,
    },
    netPay: {
      type: Number,
    },
    generatedOn: {
      type: Date,
      default: Date.now,
    },
    paymentStatus: {
      type: String,
      // enum: ["Generated", "Paid"],
      default: "Generated",
    },
    paymentDate: {
      type: Date,
     
    },
  },
  {
    timestamps: true,
  }
);

const Payroll = mongoose.model("Payroll", payrollSchema);

export default Payroll;
