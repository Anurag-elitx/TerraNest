const Post = require('../models/postModel');
const Community = require('../models/communityModel');
const asyncHandler = require('express-async-handler');

const getPosts = asyncHandler(async (req, res) => {
  const { category, search, community, page = 1, limit = 10 } = req.query;
  
  let query = { isApproved: true };
  
  if (category && category !== 'all') {
    query.category = category;
  }
  
  if (community) {
    query.organization = community;
  }
  
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
  }
  
  const posts = await Post.find(query)
    .populate('user', 'name profilePicture')
    .populate('organization', 'name')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  const total = await Post.countDocuments(query);
  
  res.json({
    posts,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total
  });
});

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('user', 'name profilePicture')
    .populate('organization', 'name')
    .populate('comments.user', 'name profilePicture')
    .populate('likes', 'name profilePicture');
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  res.json(post);
});

const createPost = asyncHandler(async (req, res) => {
  const { title, content, category, organization, images, tags } = req.body;
  
  if (!title || !content) {
    res.status(400);
    throw new Error('Please provide title and content');
  }
  
  if (organization) {
    const community = await Community.findById(organization);
    if (!community) {
      res.status(404);
      throw new Error('Community not found');
    }
    
    if (!community.members.includes(req.user._id)) {
      res.status(403);
      throw new Error('You must be a member to post in this community');
    }
  }
  
  const post = await Post.create({
    title,
    content,
    category: category || 'other',
    user: req.user._id,
    organization: organization || null,
    images: images || [],
    tags: tags || []
  });
  
  await post.populate('user', 'name profilePicture');
  await post.populate('organization', 'name');
  
  res.status(201).json(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  if (post.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this post');
  }
  
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )
    .populate('user', 'name profilePicture')
    .populate('organization', 'name')
    .populate('comments.user', 'name profilePicture');
  
  res.json(updatedPost);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  let canDelete = post.user.toString() === req.user._id.toString();
  
  if (!canDelete && post.organization) {
    const community = await Community.findById(post.organization);
    canDelete = community && community.admin.toString() === req.user._id.toString();
  }
  
  if (!canDelete) {
    res.status(403);
    throw new Error('Not authorized to delete this post');
  }
  
  await Post.findByIdAndDelete(req.params.id);
  
  res.json({ message: 'Post deleted successfully' });
});

const toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  const isLiked = post.likes.includes(req.user._id);
  
  if (isLiked) {
    post.likes = post.likes.filter(
      like => like.toString() !== req.user._id.toString()
    );
  } else {
    post.likes.push(req.user._id);
  }
  
  await post.save();
  
  res.json({
    message: isLiked ? 'Post unliked' : 'Post liked',
    likesCount: post.likes.length,
    isLiked: !isLiked
  });
});

const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    res.status(400);
    throw new Error('Please provide comment text');
  }
  
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  const comment = {
    user: req.user._id,
    text,
    date: new Date()
  };
  
  post.comments.push(comment);
  await post.save();
  
  await post.populate('comments.user', 'name profilePicture');
  
  const newComment = post.comments[post.comments.length - 1];
  
  res.status(201).json(newComment);
});

const deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  const comment = post.comments.id(req.params.commentId);
  
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }
  
  const canDelete = comment.user.toString() === req.user._id.toString() ||
                   post.user.toString() === req.user._id.toString();
  
  if (!canDelete) {
    res.status(403);
    throw new Error('Not authorized to delete this comment');
  }
  
  post.comments.pull(req.params.commentId);
  await post.save();
  
  res.json({ message: 'Comment deleted successfully' });
});

const getUserFeed = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  
  const userCommunities = await Community.find({ 
    members: req.user._id,
    isActive: true 
  }).select('_id');
  
  const communityIds = userCommunities.map(community => community._id);
  
  const posts = await Post.find({
    organization: { $in: communityIds },
    isApproved: true
  })
    .populate('user', 'name profilePicture')
    .populate('organization', 'name')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  const total = await Post.countDocuments({
    organization: { $in: communityIds },
    isApproved: true
  });
  
  res.json({
    posts,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total
  });
});

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  deleteComment,
  getUserFeed
};
