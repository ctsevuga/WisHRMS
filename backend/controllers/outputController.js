import asyncHandler from "../middleware/asyncHandler.js";
import Input from "../models/inputModel.js";
import Output from "../models/outputModel.js";
import mongoose from "mongoose";

const createOutput = async (req, res) => {
  try {
    const {
      details,          // ✅ include optional field
      outputFG,
      totalOutput,
      dross,
      iron,
      input: inputId,
      createdBy,
    } = req.body;

    // Validate required fields
    if (!outputFG || !totalOutput || !inputId || !createdBy) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Fetch the corresponding Input document
    const inputDoc = await Input.findById(inputId);
    if (!inputDoc) {
      return res.status(404).json({ message: "Input document not found." });
    }

    // Compute derived fields
    const other = inputDoc.totalMaterialInKg - (totalOutput + dross + iron);
    const drossInPerc = (dross / inputDoc.totalMaterialInKg) * 100;
    const ironInPerc = (iron / inputDoc.totalMaterialInKg) * 100;
    const actualRecovery = (totalOutput / inputDoc.totalMaterialInKg) * 100;
    const actualCostPerKg = inputDoc.totalMaterialCost / totalOutput;
    const overallCostPerKg = inputDoc.overallCost / totalOutput;

    // Safely calculate costWithConversionPerKg
    const conversionCost = typeof inputDoc.conversionCost === 'number' ? inputDoc.conversionCost : 0;
    const costWithConversionPerKg = overallCostPerKg + conversionCost;

    // Create new Output document (include details only if provided)
    const newOutput = new Output({
      details: details || "",   // ✅ optional field handled safely
      outputFG,
      totalOutput,
      dross,
      iron,
      other,
      drossInPerc,
      ironInPerc,
      actualRecovery,
      actualCostPerKg,
      overallCostPerKg,
      costWithConversionPerKg,
      input: inputId,
      createdBy,
    });

    await newOutput.save();

    res.status(201).json({
      message: "Output created successfully.",
      data: newOutput,
    });
  } catch (error) {
    console.error("Error creating output:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



const getAllOutputs = async (req, res) => {
  try {
    const outputs = await Output.find()
      .populate({
        path: 'input',
        select: 'heatNo date' // Include heatNo AND date from Input
      })
      .select(
        'details input outputFG totalOutput dross iron other drossInPerc ironInPerc actualRecovery actualCostPerKg overallCostPerKg costWithConversionPerKg createdAt updatedAt'
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: outputs
    });
  } catch (err) {
    console.error('Error fetching outputs:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch outputs'
    });
  }
};




const getOutputById = async (req, res) => {
  try {
    const output = await Output.findById(req.params.id)
      .populate("createdBy", "name email") // populate Output.createdBy
      .populate({
        path: "input",
        populate: [
          {
            path: "materials.Product", // populate products in materials
            model: "Product",
          },
          {
            path: "createdBy", // populate Input.createdBy
            model: "User",
            select: "name email", // optional
          },
        ],
      });

    if (!output) {
      return res.status(404).json({ message: "Output not found" });
    }

    // Optional: ensure costWithConversionPerKg is computed for old outputs
    if (output.costWithConversionPerKg === undefined && output.input?.conversionCost !== undefined) {
      const overallCostPerKg = output.overallCostPerKg ?? (output.input.overallCost / output.totalOutput);
      const conversionCost = output.input.conversionCost ?? 0;
      output.costWithConversionPerKg = overallCostPerKg + conversionCost;
    }

    res.status(200).json(output);
  } catch (error) {
    console.error("Error fetching output:", error);
    res.status(500).json({ message: "Server error" });
  }
};



const deleteOutput = asyncHandler(async (req, res) => {
  const output = await Output.findById(req.params.id);

  if (output) {
    await Output.deleteOne({ _id: output._id });
    res.json({ message: "Output removed" });
  } else {
    res.status(404);
    throw new Error("Output not found");
  }
});


export { createOutput,getAllOutputs,getOutputById, deleteOutput };
