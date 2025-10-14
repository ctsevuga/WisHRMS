import asyncHandler from "../middleware/asyncHandler.js";
import Input from "../models/inputModel.js";
import Output from "../models/outputModel.js";
import mongoose from "mongoose";

const createOutput = async (req, res) => {
  try {
    const {
      outputFG,
      totalOutput,
      dross,
      iron,
      input: inputId,
      createdBy,
    } = req.body;
console.log({
  outputFG,
      totalOutput,
      dross,
      iron,
      inputId,
      createdBy
})
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

    // Create new Output document
    const newOutput = new Output({
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
      input: inputId,
      createdBy,
    });

    await newOutput.save();

    res
      .status(201)
      .json({ message: "Output created successfully.", data: newOutput });
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
        select: 'heatNo' // Only include the heatNo from Input
      })
      .select('details input outputFG totalOutput dross iron other drossInPerc ironInPerc actualRecovery actualCostPerKg overallCostPerKg createdAt updatedAt')
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

// controllers/outputController.js



// const getOutputById = async (req, res) => {
//   try {
//     const output = await Output.findById(req.params.id)
//       .populate({
//         path: "input",
//         populate: {
//           path: "materials.Product",
//           model: "Product",
//         },
//       })
//       .populate("createdBy", "name ")
//       .exec();

//     if (!output) {
//       return res.status(404).json({ message: "Output not found" });
//     }

//     res.status(200).json(output);
//   } catch (error) {
//     console.error("Error fetching output:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


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
// controllers/outputController.js



// const getOutputById = async (req, res) => {
//   try {
//     const output = await Output.findById(req.params.id)
//       .populate({
//         path: "input",
//         select: "-__v", // optionally remove __v
//       })
//       .populate({
//         path: "createdBy",
//         select: "name email", // or any fields you want
//       });

//     if (!output) {
//       return res.status(404).json({ message: "Output not found" });
//     }

//     res.status(200).json(output);
//   } catch (error) {
//     console.error("Error fetching output:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export { createOutput,getAllOutputs,getOutputById, deleteOutput };
