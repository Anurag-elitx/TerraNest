const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// Register New User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role = 'public', organization, location = '', bio = '' } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  if (!['public', 'school', 'corporate', 'admin'].includes(role)) {
    res.status(400);
    throw new Error('Invalid role');
  }

  if ((role === 'school' || role === 'corporate') && !organization) {
    res.status(400);
    throw new Error('Organization is required for school/corporate roles');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password, role, organization, location, bio });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      organization: user.organization,
      profilePicture: user.profilePicture,
      location: user.location,
      bio: user.bio,
      totalEmissionSaved: user.totalEmissionSaved,
      actionsCompleted: user.actionsCompleted,
      challengesJoined: user.challengesJoined,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate('organization', 'name type');

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  if (!user.isActive) {
    res.status(401);
    throw new Error('Account is deactivated');
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    organization: user.organization,
    profilePicture: user.profilePicture,
    location: user.location,
    bio: user.bio,
    totalEmissionSaved: user.totalEmissionSaved,
    actionsCompleted: user.actionsCompleted,
    challengesJoined: user.challengesJoined,
    token: generateToken(user._id),
  });
});

// Get User Profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update User Profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.location = req.body.location || user.location;
  user.bio = req.body.bio || user.bio;
  user.profilePicture = req.body.profilePicture || user.profilePicture;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    organization: updatedUser.organization,
    profilePicture: updatedUser.profilePicture,
    location: updatedUser.location,
    bio: updatedUser.bio,
    totalEmissionSaved: updatedUser.totalEmissionSaved,
    actionsCompleted: updatedUser.actionsCompleted,
    challengesJoined: updatedUser.challengesJoined,
    token: generateToken(updatedUser._id),
  });
});

// Change Password
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  if (!user || !(await user.matchPassword(currentPassword))) {
    res.status(400);
    throw new Error('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  res.json({ message: 'Password updated successfully' });
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
};
