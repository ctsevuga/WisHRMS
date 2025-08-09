import mongoose from "mongoose";

const configurationSchema = new mongoose.Schema(
  {
     empId: {
      type: Number,
      
    },
         year: {
      type: Number,
      
    },
    totalLeaveDays: {
       type: Number,
      required: true,
    },
     availableLeaveDays: {
       type: Number,
      required: true,
    },
        daysLeaveTaken: {
       type: Number,
      required: true,
    },
        supervisorEmail: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Configuration = mongoose.model("Configuration", configurationSchema);

export default Configuration;
