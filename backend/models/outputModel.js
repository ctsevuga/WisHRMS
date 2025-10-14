import mongoose from 'mongoose';

const outputSchema = new mongoose.Schema({
  
  details: String,
  input: { type: mongoose.Schema.Types.ObjectId, ref: 'Input' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  outputFG: Number,
  totalOutput: Number,
  dross: Number,
  iron: Number,
  other: Number,
  drossInPerc: Number,
  ironInPerc: Number,
  actualRecovery: Number,
  actualCostPerKg: Number,
  overallCostPerKg: Number,
  

}, { timestamps: true });

const Output = mongoose.model('Output', outputSchema);

export default Output;