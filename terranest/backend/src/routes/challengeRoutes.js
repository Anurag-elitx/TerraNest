const express = require('express');
const Challenge = require('../models/challengeModel');
const User = require('../models/userModel');
const Organization = require('../models/organizationModel');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

const getChallenges = async (req, res) => {
  try {
    const { 
      category, 
      level, 
      scope, 
      status, 
      page = 1, 
      limit = 10, 
      search,
      organization,
      location 
    } = req.query;
    
    let query = { isActive: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (level && level !== 'all') {
      query.level = level;
    }
    
    if (scope && scope !== 'all') {
      query.scope = scope;
    }
    
    if (organization) {
      query.organization = organization;
    }
    
    if (location) {
      query.location = new RegExp(location, 'i');
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (status && req.user) {
      if (status === 'joined') {
        query.participants = req.user._id;
      } else if (status === 'not-joined') {
        query.participants = { $ne: req.user._id };
      } else if (status === 'completed') {
        query.completedBy = req.user._id;
      }
    }

    const challenges = await Challenge.find(query)
      .populate('createdBy', 'name')
      .populate('organization', 'name')
      .populate('actions.action', 'title category emissionSaved points')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Challenge.countDocuments(query);

    res.json({
      challenges,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('organization', 'name')
      .populate('actions.action', 'title description category emissionSaved points frequency')
      .populate('participants', 'name profilePicture')
      .populate('completedBy', 'name profilePicture');
    
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    res.json(challenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createChallenge = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      image,
      startDate,
      endDate,
      actions,
      points,
      badge,
      level,
      scope,
      organization,
      location
    } = req.body;

    if (scope === 'organization') {
      if (!organization) {
        return res.status(400).json({ message: 'Organization is required for organization scope' });
      }
      
      const org = await Organization.findById(organization);
      if (!org) {
        return res.status(404).json({ message: 'Organization not found' });
      }
      
      if (org.admin.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to create challenges for this organization' });
      }
    }

    if (scope === 'local' && !location) {
      return res.status(400).json({ message: 'Location is required for local scope' });
    }
    const challenge = await Challenge.create({
      title,
      description,
      category,
      image,
      startDate,
      endDate,
      actions,
      points,
      badge,
      level,
      scope,
      organization: scope === 'organization' ? organization : undefined,
      location: scope === 'local' ? location : undefined,
      createdBy: req.user._id
    });

    const populatedChallenge = await Challenge.findById(challenge._id)
      .populate('createdBy', 'name')
      .populate('organization', 'name')
      .populate('actions.action', 'title category emissionSaved points');

    res.status(201).json(populatedChallenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (req.user.role !== 'admin' && challenge.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this challenge' });
    }

    const updatedChallenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name')
     .populate('organization', 'name')
     .populate('actions.action', 'title category emissionSaved points');

    res.json(updatedChallenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (req.user.role !== 'admin' && challenge.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this challenge' });
    }

    await Challenge.findByIdAndDelete(req.params.id);

    res.json({ message: 'Challenge removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const joinChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    const now = new Date();
    if (now > challenge.endDate) {
      return res.status(400).json({ message: 'Challenge has already ended' });
    }

    if (challenge.participants.includes(req.user._id)) {
      return res.status(400).json({ message: 'You are already participating in this challenge' });
    }

    challenge.participants.push(req.user._id);
    await challenge.save();

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { challengesJoined: 1 }
    });

    const updatedChallenge = await Challenge.findById(challenge._id)
      .populate('createdBy', 'name')
      .populate('organization', 'name')
      .populate('participants', 'name profilePicture');

    res.json(updatedChallenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const leaveChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (!challenge.participants.includes(req.user._id)) {
      return res.status(400).json({ message: 'You are not participating in this challenge' });
    }

    challenge.participants = challenge.participants.filter(
      participant => participant.toString() !== req.user._id.toString()
    );
    await challenge.save();

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { challengesJoined: -1 }
    });

    const updatedChallenge = await Challenge.findById(challenge._id)
      .populate('createdBy', 'name')
      .populate('organization', 'name')
      .populate('participants', 'name profilePicture');

    res.json(updatedChallenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const completeChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (!challenge.participants.includes(req.user._id)) {
      return res.status(400).json({ message: 'You must join the challenge before completing it' });
    }

    if (challenge.completedBy.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have already completed this challenge' });
    }

    challenge.completedBy.push(req.user._id);
    await challenge.save();

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { 
        totalEmissionSaved: challenge.points * 0.1, 
        challengesCompleted: 1 
      }
    });

    const updatedChallenge = await Challenge.findById(challenge._id)
      .populate('createdBy', 'name')
      .populate('organization', 'name')
      .populate('completedBy', 'name profilePicture');

    res.json(updatedChallenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserChallenges = async (req, res) => {
  try {
    const { status = 'all', page = 1, limit = 10 } = req.query;
    
    let query = { participants: req.user._id };
    
    if (status === 'completed') {
      query.completedBy = req.user._id;
    } else if (status === 'active') {
      query.completedBy = { $ne: req.user._id };
      query.endDate = { $gte: new Date() };
    }

    const challenges = await Challenge.find(query)
      .populate('createdBy', 'name')
      .populate('organization', 'name')
      .populate('actions.action', 'title category')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Challenge.countDocuments(query);

    res.json({
      challenges,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getChallengeProgress = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('actions.action', 'title category emissionSaved points');

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (!challenge.participants.includes(req.user._id)) {
      return res.status(400).json({ message: 'You are not participating in this challenge' });
    }

    const totalActions = challenge.actions.reduce((sum, action) => sum + action.count, 0);
    const completedActions = Math.floor(Math.random() * totalActions); 
    const progress = Math.round((completedActions / totalActions) * 100);

    res.json({
      challengeId: challenge._id,
      totalActions,
      completedActions,
      progress,
      isCompleted: challenge.completedBy.includes(req.user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

router.route('/')
  .get(getChallenges)
  .post(protect, authorize('admin', 'school', 'corporate'), createChallenge);

router.route('/:id')
  .get(getChallenge)
  .put(protect, updateChallenge)
  .delete(protect, deleteChallenge);

router.post('/:id/join', protect, joinChallenge);
router.post('/:id/leave', protect, leaveChallenge);
router.post('/:id/complete', protect, completeChallenge);
router.get('/:id/progress', protect, getChallengeProgress);
router.get('/user/joined', protect, getUserChallenges);

module.exports = router;
