const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');

// JWT Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.id).select('-password');
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Google OAuth - Profile received:', {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value
      });
    // Check if user already exists
    let user = await User.findOne({ 
      $or: [
        { googleId: profile.id },
        { email: profile.emails[0].value }
      ]
    });

    if (user) {
      console.log('Existing user found:', user.email);
      if (!user.googleId) {
        user.googleId = profile.id;
        user.isOAuthUser = true;
        await user.save();
      }
      return done(null, user);
    }

    console.log('Creating new user from Google OAuth');

    user = await User.create({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value || `${profile.id}@google.oauth`,
      profilePicture: profile.photos?.[0]?.value || '',
      role: 'public',
      password: 'oauth_user_' + Date.now(),
      isOAuthUser: true
    });
    console.log('New user created:', user.email);
    return done(null, user);
  } catch (error) {
    console.log('New user created:', user.email);
    return done(error, null);
  }
}));
} else {
  console.warn('Google OAuth not configured - missing client ID or secret');
}

// Facebook OAuth Strategy
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Facebook OAuth - Profile received:', {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value
      });
    // Check if user already exists
    let user = await User.findOne({ 
      $or: [
        { facebookId: profile.id },
        { email: profile.emails ? profile.emails[0].value : null }
      ]
    });

    if (user) {
      // Update Facebook ID if user exists but doesn't have it
      if (!user.facebookId) {
        user.facebookId = profile.id;
         user.isOAuthUser = true;
        await user.save();
      }
      return done(null, user);
    }

    // Create new user
    user = await User.create({
      facebookId: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value || `${profile.id}@facebook.oauth`,
      profilePicture: profile.photos?.[0]?.value || '',
      role: 'public',
      password: 'oauth_user_' + Date.now(),
      isOAuthUser: true
    });
    console.log('New user created:', user.email);
    return done(null, user);
  } catch (error) {
    console.error('Facebook OAuth error:', error);
    return done(error, null);
  }
}));
} else {
  console.warn('Facebook OAuth not configured - missing app ID or secret');
}

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-password');
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
