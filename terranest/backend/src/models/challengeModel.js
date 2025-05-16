const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    enum: ['transport', 'energy', 'food', 'waste', 'water', 'other'],
    required: [true, 'Please specify a category']
  },
  image: {
    type: String,
    default: 'default-challenge.jpg'
  },
  startDate: {
    type: Date,
    required: [true, 'Please specify a start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please specify an end date']
  },
  actions: [{
    action: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Action',
      required: true
    },
    count: {
      type: Number,
      default: 1,
      min: 1
    }
  }],
  points: {
    type: Number,
    required: [true, 'Please specify points for this challenge']
  },
  badge: {
    type: String,
    default: 'default-badge.png'
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  scope: {
    type: String,
    enum: ['global', 'organization', 'local'],
    default: 'global'
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: function() {
      return this.scope === 'organization';
    }
  },
  location: {
    type: String,
    required: function() {
      return this.scope === 'local';
    }
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  completedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;