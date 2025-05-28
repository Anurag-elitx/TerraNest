const express = require('express');
const passport = require('../config/passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Organization = require('../models/organizationModel');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, organizationName } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let organizationId = null;

    if (role === 'school' || role === 'corporate') {
      if (!organizationName) {
        return res.status(400).json({ message: 'Organization name is required for school and corporate accounts' });
      }

      let organization = await Organization.findOne({ 
        name: organizationName,
        type: role === 'school' ? 'school' : 'corporate'
      });

      if (!organization) {
        organization = await Organization.create({
          name: organizationName,
          type: role === 'school' ? 'school' : 'corporate',
          email: email, 
          admin: null 
        });
      }

      organizationId = organization._id;
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      organization: organizationId
    });

    if (organizationId && role !== 'public') {
      await Organization.findByIdAndUpdate(organizationId, {
        admin: user._id,
        $push: { members: user._id }
      });
    }

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('organization');

    if (user && (await user.matchPassword(password))) {
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
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('organization')
      .populate('badges');

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
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  
passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);
=======
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { protect } = require('../middleware/authMiddleware');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};


router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});


router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.status(200).json(user);
});


// Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);
module.exports = router;
