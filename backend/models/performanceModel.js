import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reviewPeriod: {
      type: String,
    },

    goals: {
      type: String,
    },
    selfRating: {
      type: Number,
    },
    managerRating: {
      type: Number,
    },
    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Grade = mongoose.model("Leave", leaveSchema);

export default Leave;
