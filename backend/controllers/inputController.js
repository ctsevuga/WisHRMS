import asyncHandler from "../middleware/asyncHandler.js";
import Input from "../models/inputModel.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

const createInput = async (req, res) => {
  try {
    const safeNumber = (val) => typeof val === 'number' && !isNaN(val) ? val : 0;
 const {
  heatNo,
  details,
  createdBy,
  materials,
} = req.body;

const workersSalary = safeNumber(req.body.workersSalary);
const middleManagementSalary = safeNumber(req.body.middleManagementSalary);
const topManagementSalary = safeNumber(req.body.topManagementSalary);
const gasCost = safeNumber(req.body.gasCost);
const waterCost = safeNumber(req.body.waterCost);
const electricityCost = safeNumber(req.body.electricityCost);
const foodCost = safeNumber(req.body.foodCost);
const fuelForkLiftCost = safeNumber(req.body.fuelForkLiftCost);
const maintenanceCost = safeNumber(req.body.maintenanceCost);




// Materials validation
if (!Array.isArray(materials) || materials.length === 0) {
  return res.status(400).json({ message: 'Materials array is required and cannot be empty.' });
}


    // Step 1: Enrich materials with cost
   const enrichedMaterials = await Promise.all(
  materials.map(async (material) => {
    if (!material.Product || !material.qtyInKg) {
      throw new Error(`Material entry is missing Product or qtyInKg: ${JSON.stringify(material)}`);
    }

    const product = await Product.findById(material.Product);
    if (!product) {
      throw new Error(`Product not found: ${material.Product}`);
    }

    if (typeof product.Price !== 'number') {
      throw new Error(`Product Price is invalid for product ID: ${material.Product}`);
    }

    const cost = parseFloat(material.qtyInKg) * product.Price;

    return {
      ...material,
      cost,
    };
  })
);

    // Step 2: Calculate totalMaterialCost
    const totalMaterialCost = enrichedMaterials.reduce((acc, item) => acc + item.cost, 0);
    const totalMaterialInKg = enrichedMaterials.reduce((acc, item) => acc + item.qtyInKg, 0);
    const materialkgPerCost = totalMaterialCost /totalMaterialInKg;
    const overallCost = (totalMaterialCost + workersSalary + middleManagementSalary + topManagementSalary +
      gasCost +
      waterCost +
      electricityCost +
      foodCost +
      fuelForkLiftCost +
      maintenanceCost);
   const overallmaterialkgPerCost =  overallCost / totalMaterialInKg; 

    // Step 3: Create new Input document
    const newInput = new Input({
      heatNo,
      details,
      createdBy,
      materials: enrichedMaterials,
      totalMaterialCost,
      totalMaterialInKg,
      materialkgPerCost,
      workersSalary,
      middleManagementSalary,
      topManagementSalary,
      gasCost,
      waterCost,
      electricityCost,
      foodCost,
      fuelForkLiftCost,
      maintenanceCost,
      overallCost,
      overallmaterialkgPerCost
    });

    // Step 4: Save to DB
    await newInput.save();

    res.status(201).json({ message: 'Input created successfully', input: newInput });
  } catch (error) {
    console.error('Error creating input:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};
// controllers/inputController.js

const getAllInputBasic = async (req, res) => {
  try {
    const inputs = await Input.find({}, '_id heatNo')
    .sort({ date: -1 });; // Only select _id and name
    res.status(200).json(inputs);
  } catch (error) {
    console.error('Error fetching inputs:', error);
    res.status(500).json({ message: 'Server error while fetching inputs' });
  }
};

const listInputs = async (req, res) => {
  try {
    const { product } = req.query;

    // Build query dynamically based on optional product filter
    const query = product
      ? { 'materials.Product': product }
      : {};

    const inputs = await Input.find(query)
      .select([
        'heatNo',
        'date',
        'totalMaterialCost',
        'totalMaterialInKg',
        'materialkgPerCost',
        'workersSalary',
        'middleManagementSalary',
        'topManagementSalary',
        'gasCost',
        'waterCost',
        'electricityCost',
        'foodCost',
        'fuelForkLiftCost',
        'maintenanceCost',
        'overallCost',
        'overallmaterialkgPerCost',
        'materials'
      ])
      .populate({
        path: 'materials.Product',
        select: 'Product', // Only fetch Product name
      })
      .sort({ date: -1 });

    res.status(200).json(inputs);
  } catch (error) {
    console.error('Error fetching inputs:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};
const deleteInput = asyncHandler(async (req, res) => {
  const input = await Input.findById(req.params.id);

  if (input) {
    await Input.deleteOne({ _id: input._id });
    res.json({ message: "Input removed" });
  } else {
    res.status(404);
    throw new Error("Input not found");
  }
});

const getInputById = async (req, res) => {
  try {
    const inputId = req.params.id;

    const input = await Input.findById(inputId)
      .populate('materials.Product', 'Product Price') // get Product name & Price
      .populate('createdBy', 'name '); // optional: remove if not needed

    if (!input) {
      return res.status(404).json({ message: 'Input not found' });
    }

    res.status(200).json(input);
  } catch (error) {
    console.error('Error fetching input by ID:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

export {
  createInput,
  listInputs,
  deleteInput,
  getInputById,
  getAllInputBasic,
};
