import mongoose from "mongoose";

const parametersSchema = new mongoose.Schema(
  {
     HRA: {
      type: Number,
      
    },
         Conveyances: {
      type: Number,
      
    },
         OtherAllowances: {
      type: Number,
      
    },
    PFEmployeeContribution: {
       type: Number,
      required: true,
    },
     PFEmployerContribution: {
       type: Number,
      required: true,
    },
        ESI: {
       type: Number,
      required: true,
    },
            Tax: {
       type: Number,
      required: true,
    },
 
  },
  {
    timestamps: true,
  }
);

const Parameter = mongoose.model("Parameter", parametersSchema);

export default Parameter;
