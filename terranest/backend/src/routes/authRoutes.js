const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Regular auth routes
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, organization } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = await User.create({
      name,
      email,
      password,
      role,
      organization
    });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    if (user.isOAuthUser) {
      return res.status(400).json({ message: 'Please use Google or Facebook to sign in' });
    }
    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/error?message=Google authentication failed`,
    session: false 
  }),
  (req, res) => {
    try {
      console.log('Google OAuth callback - User:', req.user);
      
      if (!req.user) {
        console.error('No user found in Google OAuth callback');
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/error?message=Authentication failed`);
      }
      // Generate JWT token
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      
      // Update last login
      req.user.lastLogin = new Date();
      req.user.save();
      
      // Redirect to frontend with token
      const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
      const userData = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        profilePicture: req.user.profilePicture
      };
      
      const redirectURL = `${frontendURL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`;

      console.log('Redirecting to frontend with token and user data');

      res.redirect(redirectURL);
    } catch (error) {
      console.log('Google OAuth callback error:',error)
      const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendURL}/auth/error?message=${encodeURIComponent('Authentication failed')}`);
    }
  }
);

// Facebook OAuth routes
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/error?message=Facebook authentication failed`,
    session: false  }),
  (req, res) => {
    try {
      console.log('Facebook OAuth callback - User:', req.user);
      
      if (!req.user) {
        console.error('No user found in Facebook OAuth callback');
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/error?message=Authentication failed`);
      }
      // Generate JWT token
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      
      // Update last login
      req.user.lastLogin = new Date();
      req.user.save();
      
      // Redirect to frontend with token
      const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
      const userData = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        profilePicture: req.user.profilePicture
      };

      console.log('Redirecting to frontend with token and user data');

      res.redirect(`${frontendURL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`);
    } catch (error) {
      console.error('Facebook OAuth callback error:', error);
      const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendURL}/auth/error?message=${encodeURIComponent('Authentication failed')}`);
    }
  }
);

// Get current user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Logout (mainly for clearing any server-side sessions)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
