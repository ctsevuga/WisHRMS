import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    empId: {
      type: Number,
    },
    name: {
      type: String,
      // required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    reason: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
      // enum: ['Present', 'Absent', 'Leave', 'Holiday'], default: 'Absent'
    },
    numberOfDays: {
      type: Number,
    },
    by: {
      type: String,
      

      // enum: ['Present', 'Absent', 'Leave', 'Holiday'], default: 'Absent'
    },
  },
  {
    timestamps: true,
  }
);

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
