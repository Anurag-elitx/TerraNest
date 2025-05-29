const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId && !this.facebookId;
    },
    minlength: [6, 'Password must be at least 6 characters']
  },
  // OAuth fields
  googleId: {
    type: String,
    sparse: true
  },
  facebookId: {
    type: String,
    sparse: true
  },
  role: {
    type: String,
    enum: ['public', 'school', 'corporate', 'admin'],
    default: 'public'
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: function() {
      return this.role === 'school' || this.role === 'corporate';
    }
  },
  profilePicture: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  totalEmissionSaved: {
    type: Number,
    default: 0
  },
  actionsCompleted: {
    type: Number,
    default: 0
  },
  challengesJoined: {
    type: Number,
    default: 0
  },
  badges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  // OAuth specific fields
  isOAuthUser: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  // Skip password hashing for OAuth users or if password is not modified
  if (!this.isModified('password') || this.isOAuthUser) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  if (this.isOAuthUser) {
    return false; // OAuth users can't login with password
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

// Set isOAuthUser flag when OAuth IDs are present
userSchema.pre('save', function(next) {
  if (this.googleId || this.facebookId) {
    this.isOAuthUser = true;
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;