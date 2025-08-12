import asyncHandler from '../middleware/asyncHandler.js';
import Parameter from '../models/ParametersModel.js';

// @desc    Create a new parameter record
// @route   POST /api/parameters
// @access  Private/Admin
export const createParameter = asyncHandler(async (req, res) => {
  const {
    HRA,
    OtherAllowances,
    PFEmployeeContribution,
    PFEmployerContribution,
    ESI,
    Tax,
  } = req.body;

  const parameter = new Parameter({
    HRA,
    OtherAllowances,
    PFEmployeeContribution,
    PFEmployerContribution,
    ESI,
    Tax,
  });

  const createdParameter = await parameter.save();
  res.status(201).json(createdParameter);
});

// @desc    Get all parameters
// @route   GET /api/parameters
// @access  Private/Admin
export const getParameters = asyncHandler(async (req, res) => {
  const parameters = await Parameter.find({});
  res.json(parameters);
});

// @desc    Get single parameter by ID
// @route   GET /api/parameters/:id
// @access  Private/Admin
export const getParameterById = asyncHandler(async (req, res) => {
  const parameter = await Parameter.findById(req.params.id);

  if (!parameter) {
    res.status(404);
    throw new Error('Parameter not found');
  }

  res.json(parameter);
});

// @desc    Update a parameter
// @route   PUT /api/parameters/:id
// @access  Private/Admin
export const updateParameter = asyncHandler(async (req, res) => {
  const parameter = await Parameter.findById(req.params.id);

  if (!parameter) {
    res.status(404);
    throw new Error('Parameter not found');
  }

  parameter.HRA = req.body.HRA ?? parameter.HRA;
  parameter.OtherAllowances = req.body.OtherAllowances ?? parameter.OtherAllowances;
  parameter.PFEmployeeContribution = req.body.PFEmployeeContribution ?? parameter.PFEmployeeContribution;
  parameter.PFEmployerContribution = req.body.PFEmployerContribution ?? parameter.PFEmployerContribution;
  parameter.ESI = req.body.ESI ?? parameter.ESI;
  parameter.Tax = req.body.Tax ?? parameter.Tax;

  const updatedParameter = await parameter.save();
  res.json(updatedParameter);
});

// @desc    Delete a parameter
// @route   DELETE /api/parameters/:id
// @access  Private/Admin
export const deleteParameter = asyncHandler(async (req, res) => {
  const parameter = await Parameter.findById(req.params.id);

  if (!parameter) {
    res.status(404);
    throw new Error('Parameter not found');
  }

  await parameter.remove();
  res.json({ message: 'Parameter deleted successfully' });
});
