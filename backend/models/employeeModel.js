import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
   
    empId: {
      type: Number,
      
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    dob: {
      type: Date,
    },
    joiningDate: {
      type: Date,
    },
    department: {
      type: String,
    },
    designation: {
      type: String,
    },
    contact: {
      type: String,
    },
    address: {
      type: String,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    ifscCode: { type: String, required: true },
    bankName: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
