const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  images: [{
    type: String
  }],
  category: {
    type: String,
    enum: ['success-story', 'event', 'tip', 'question', 'news', 'other'],
    default: 'other'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [{
    type: String
  }],
  isApproved: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;