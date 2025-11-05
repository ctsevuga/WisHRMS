import mongoose from 'mongoose';
import Product from './productModel.js';
const inputSchema = new mongoose.Schema({
  heatNo: { type: String,required: true, unique: true, },
  date: { type: Date, default: Date.now },
  details: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  materials: [{
    Product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    qtyInKg: { type: Number,  required: true },
    cost: { type: Number, required: true }
  }],
  totalMaterialCost: Number,
  totalMaterialInKg: Number,
  materialkgPerCost: Number,
  workersSalary: Number,
  middleManagementSalary: Number,
  topManagementSalary: Number,
  gasCost: Number,
  waterCost: Number,
  electricityCost: Number,
  foodCost: Number,
  fuelForkLiftCost: Number,
  maintenanceCost: Number,
  conversionCost: Number,
  overallCost: Number,
  overallmaterialkgPerCost: Number,
  costWithConversionKgPerCost: Number,

}, { timestamps: true });

const Input = mongoose.model('Input', inputSchema);

export default Input;