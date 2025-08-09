import mongoose from "mongoose";

const monthSchema = new mongoose.Schema(
  {
     month: {
       type: String,
      
    },
         year: {
      type: Number,
      
    },
    totalWorkingDays: {
       type: Number,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

const Month = mongoose.model("Month", monthSchema);

export default Month;
