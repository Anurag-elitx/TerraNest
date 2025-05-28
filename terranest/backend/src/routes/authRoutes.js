const express = require('express');
const passport = require('../config/passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Organization = require('../models/organizationModel');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Token generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register user with optional org creation
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, organizationName } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let organizationId = null;

    if (role === 'school' || role === 'corporate') {
      if (!organizationName) {
        return res.status(400).json({ message: 'Organization name is required for this role' });
      }

      let organization = await Organization.findOne({
        name: organizationName,
        type: role,
      });

      if (!organization) {
        organization = await Organization.create({
          name: organizationName,
          type: role,
          email,
          admin: null,
        });
      }

      organizationId = organization._id;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      organization: organizationId,
    });

    if (organizationId) {
      await Organization.findByIdAndUpdate(organizationId, {
        admin: user._id,
        $push: { members: user._id },
      });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      organization: user.organization,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('organization');
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

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
      badges: user.badges,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current user
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('organization')
      .populate('badges');

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

// Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

module.exports = router;
