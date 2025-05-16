const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
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
  emissionSaved: {
    type: Number,
    required: [true, 'Please specify emission saved in kg CO2']
  },
  points: {
    type: Number,
    required: [true, 'Please specify points for this action']
  },
  icon: {
    type: String,
    default: 'default-action-icon.png'
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'one-time'],
    default: 'daily'
  },
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

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;