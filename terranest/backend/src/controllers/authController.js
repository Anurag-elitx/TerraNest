const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, organization } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'public',
    organization: organization || null
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
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

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please add email and password');
  }

  const user = await User.findOne({ email }).populate('organization', 'name type');

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
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
    throw new Error('Invalid credentials');
  }
});

const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profilePicture = req.body.profilePicture || user.profilePicture;
    user.location = req.body.location || user.location;
    user.bio = req.body.bio || user.bio;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser.id,
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
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error('Please provide current and new password');
  }

  const user = await User.findById(req.user.id);

  if (user && (await user.matchPassword(currentPassword))) {
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } else {
    res.status(400);
    throw new Error('Current password is incorrect');
  }
});

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
};
