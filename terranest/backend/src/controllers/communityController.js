const Community = require('../models/communityModel');
const Post = require('../models/postModel');
const asyncHandler = require('express-async-handler');

const getCommunities = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;
  
  let query = { isActive: true };
  
  if (category && category !== 'all') {
    query.category = category;
  }
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  
  const communities = await Community.find(query)
    .populate('admin', 'name email profilePicture')
    .populate('members', 'name profilePicture')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  const total = await Community.countDocuments(query);
  
  const communitiesWithCounts = await Promise.all(
    communities.map(async (community) => {
      const postCount = await Post.countDocuments({ 
        organization: community._id,
        isApproved: true 
      });
      
      return {
        ...community.toObject(),
        memberCount: community.members.length,
        postCount
      };
    })
  );
  
  res.json({
    communities: communitiesWithCounts,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total
  });
});

const getCommunity = asyncHandler(async (req, res) => {
  const community = await Community.findById(req.params.id)
    .populate('admin', 'name email profilePicture')
    .populate('members', 'name profilePicture');
  
  if (!community) {
    res.status(404);
    throw new Error('Community not found');
  }
  
  const postCount = await Post.countDocuments({ 
    organization: community._id,
    isApproved: true 
  });
  
  res.json({
    ...community.toObject(),
    memberCount: community.members.length,
    postCount
  });
});

const createCommunity = asyncHandler(async (req, res) => {
  const { name, description, category, image } = req.body;
  
  if (!name || !description || !category) {
    res.status(400);
    throw new Error('Please provide name, description, and category');
  }
  
  const existingCommunity = await Community.findOne({ name });
  if (existingCommunity) {
    res.status(400);
    throw new Error('Community with this name already exists');
  }
  
  const community = await Community.create({
    name,
    description,
    category,
    image: image || `https://source.unsplash.com/800x600/?${category}`,
    admin: req.user._id,
    members: [req.user._id]
  });
  
  await community.populate('admin', 'name email profilePicture');
  await community.populate('members', 'name profilePicture');
  
  res.status(201).json({
    ...community.toObject(),
    memberCount: 1,
    postCount: 0
  });
});

const updateCommunity = asyncHandler(async (req, res) => {
  const community = await Community.findById(req.params.id);
  
  if (!community) {
    res.status(404);
    throw new Error('Community not found');
  }
  
  if (community.admin.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this community');
  }
  
  const updatedCommunity = await Community.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )
    .populate('admin', 'name email profilePicture')
    .populate('members', 'name profilePicture');
  
  const postCount = await Post.countDocuments({ 
    organization: updatedCommunity._id,
    isApproved: true 
  });
  
  res.json({
    ...updatedCommunity.toObject(),
    memberCount: updatedCommunity.members.length,
    postCount
  });
});

const deleteCommunity = asyncHandler(async (req, res) => {
  const community = await Community.findById(req.params.id);
  
  if (!community) {
    res.status(404);
    throw new Error('Community not found');
  }
  
  if (community.admin.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this community');
  }
  
  await Community.findByIdAndDelete(req.params.id);
  
  res.json({ message: 'Community deleted successfully' });
});

const joinCommunity = asyncHandler(async (req, res) => {
  const community = await Community.findById(req.params.id);
  
  if (!community) {
    res.status(404);
    throw new Error('Community not found');
  }
  
  if (community.members.includes(req.user._id)) {
    res.status(400);
    throw new Error('You are already a member of this community');
  }
  
  community.members.push(req.user._id);
  await community.save();
  
  res.json({ message: 'Successfully joined the community' });
});

const leaveCommunity = asyncHandler(async (req, res) => {
  const community = await Community.findById(req.params.id);
  
  if (!community) {
    res.status(404);
    throw new Error('Community not found');
  }
  
  if (community.admin.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error('Community admin cannot leave the community');
  }
  
  if (!community.members.includes(req.user._id)) {
    res.status(400);
    throw new Error('You are not a member of this community');
  }
  
  community.members = community.members.filter(
    member => member.toString() !== req.user._id.toString()
  );
  await community.save();
  
  res.json({ message: 'Successfully left the community' });
});

const getUserCommunities = asyncHandler(async (req, res) => {
  const { type = 'joined' } = req.query;
  
  let query;
  if (type === 'admin') {
    query = { admin: req.user._id, isActive: true };
  } else {
    query = { members: req.user._id, isActive: true };
  }
  
  const communities = await Community.find(query)
    .populate('admin', 'name email profilePicture')
    .populate('members', 'name profilePicture')
    .sort({ createdAt: -1 });
  
  const communitiesWithCounts = await Promise.all(
    communities.map(async (community) => {
      const postCount = await Post.countDocuments({ 
        organization: community._id,
        isApproved: true 
      });
      
      return {
        ...community.toObject(),
        memberCount: community.members.length,
        postCount
      };
    })
  );
  
  res.json({ communities: communitiesWithCounts });
});

const getCommunityPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  
  const community = await Community.findById(req.params.id);
  
  if (!community) {
    res.status(404);
    throw new Error('Community not found');
  }
  
  if (!community.members.includes(req.user._id)) {
    res.status(403);
    throw new Error('You must be a member to view community posts');
  }
  
  const posts = await Post.find({ 
    organization: req.params.id,
    isApproved: true 
  })
    .populate('user', 'name profilePicture')
    .populate('organization', 'name')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  const total = await Post.countDocuments({ 
    organization: req.params.id,
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
  getCommunities,
  getCommunity,
  createCommunity,
  updateCommunity,
  deleteCommunity,
  joinCommunity,
  leaveCommunity,
  getUserCommunities,
  getCommunityPosts
};