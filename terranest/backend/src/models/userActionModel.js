const mongoose = require('mongoose');

const userActionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Action',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  emissionSaved: {
    type: Number,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  proof: {
    type: String, // URL to uploaded image/document
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: true // Auto-verified by default, can be changed for actions requiring proof
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate actions on the same day for the same user
userActionSchema.index({ user: 1, action: 1, date: 1 }, { unique: true });

const UserAction = mongoose.model('UserAction', userActionSchema);

module.exports = UserAction;