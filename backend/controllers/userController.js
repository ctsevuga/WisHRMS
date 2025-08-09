import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      empId: user.empId,
      name: user.name,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isHR: user.isHR,
      isEmployee: user.isEmployee,
      
    });
  } else {
    res.status(401);
    throw new Error('Invalid phone or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, password } = req.body;

  const userExists = await User.findOne({ phone });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const lastUser = await User.findOne().sort({ empId: -1 }).select('empId');
    
  const empId =  lastUser.empId + 1; 
  const user = await User.create({
    empId,
    name,
    phone,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      empId: user.empId,
      name: user.name,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isHR: user.isHR,
      isEmployee: user.isEmployee,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
// const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       isCOE: user.isCOE,
//       isMechFaculty: user.isMechFaculty,
//       isCivilFaculty: user.isCivilFaculty,
//       isEEEFaculty: user.isEEEFaculty,
//       isECEFaculty: user.isECEFaculty,
//       isCSEFaculty: user.isCSEFaculty,
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;

//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       isCOE: updatedUser.isCOE,
//       isMechFaculty: updatedUser.isMechFaculty,
//       isCivilFaculty: updatedUser.isCivilFaculty,
//       isEEEFaculty: updatedUser.isEEEFaculty,
//       isECEFaculty: updatedUser.isECEFaculty,
//       isCSEFaculty: updatedUser.isCSEFaculty,
      
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Reset the password
// @route   PUT /api/users
// @access  Public
const forgot = asyncHandler(async (req, res) => {
  const phone  = req.body.phone;
  const user = await User.findOne({ phone });

  if (user) {
    user.phone = req.body.phone || user.phone;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Can not delete admin user');
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    user.isHR = Boolean(req.body.isHR);
    user.isEmployee = Boolean(req.body.isEmployee);
    

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,isCOE: updatedUser.isCOE,
      isHR: updatedUser.isEmployee,
      
      isAdmin: updatedUser.isAdmin,
      
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
   forgot,
  logoutUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
