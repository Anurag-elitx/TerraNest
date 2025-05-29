const express = require('express');
const UserAction = require('../models/userActionModel');
const Action = require('../models/actionModel');
const User = require('../models/userModel');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const getUserActions = async (req, res) => {
  try {
    const { user, action, verified, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    if (user) {
      query.user = user;
    }
    
    if (action) {
      query.action = action;
    }
    
    if (verified !== undefined) {
      query.isVerified = verified === 'true';
    }

    const userActions = await UserAction.find(query)
      .populate('user', 'name email profilePicture')
      .populate('action', 'title category emissionSaved points')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await UserAction.countDocuments(query);

    res.json({
      userActions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserAction = async (req, res) => {
  try {
    const userAction = await UserAction.findById(req.params.id)
      .populate('user', 'name email profilePicture')
      .populate('action', 'title description category emissionSaved points createdBy');
    
    if (!userAction) {
      return res.status(404).json({ message: 'User action not found' });
    }

    if (
      req.user._id.toString() !== userAction.user._id.toString() &&
      req.user.role !== 'admin' &&
      req.user._id.toString() !== userAction.action.createdBy.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to view this action' });
    }

    res.json(userAction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logUserAction = async (req, res) => {
  try {
    const { actionId, notes, proof } = req.body;

    const action = await Action.findById(actionId);
    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }

    if (action.frequency === 'daily') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const existingLog = await UserAction.findOne({
        user: req.user._id,
        action: actionId,
        date: { $gte: today, $lt: tomorrow }
      });

      if (existingLog) {
        return res.status(400).json({ message: 'You have already logged this action today' });
      }
    }

    if (action.frequency === 'weekly') {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      weekStart.setHours(0, 0, 0, 0);
      
      const existingLog = await UserAction.findOne({
        user: req.user._id,
        action: actionId,
        date: { $gte: weekStart }
      });

      if (existingLog) {
        return res.status(400).json({ message: 'You have already logged this action this week' });
      }
    }

    if (action.frequency === 'monthly') {
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      
      const existingLog = await UserAction.findOne({
        user: req.user._id,
        action: actionId,
        date: { $gte: monthStart }
      });

      if (existingLog) {
        return res.status(400).json({ message: 'You have already logged this action this month' });
      }
    }

    const userAction = await UserAction.create({
      user: req.user._id,
      action: actionId,
      emissionSaved: action.emissionSaved,
      points: action.points,
      notes,
      proof
    });

    await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        totalEmissionSaved: action.emissionSaved,
        actionsCompleted: 1
      }
    });

    const populatedUserAction = await UserAction.findById(userAction._id)
      .populate('user', 'name profilePicture')
      .populate('action', 'title category emissionSaved points');

    res.status(201).json(populatedUserAction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserAction = async (req, res) => {
  try {
    const userAction = await UserAction.findById(req.params.id);

    if (!userAction) {
      return res.status(404).json({ message: 'User action not found' });
    }

    if (userAction.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this action' });
    }

    const updatedUserAction = await UserAction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name profilePicture')
     .populate('action', 'title category emissionSaved points');

    res.json(updatedUserAction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUserAction = async (req, res) => {
  try {
    const userAction = await UserAction.findById(req.params.id).populate('action');

    if (!userAction) {
      return res.status(404).json({ message: 'User action not found' });
    }

    if (userAction.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this action' });
    }

    await User.findByIdAndUpdate(userAction.user, {
      $inc: {
        totalEmissionSaved: -userAction.emissionSaved,
        actionsCompleted: -1
      }
    });

    await UserAction.findByIdAndDelete(req.params.id);

    res.json({ message: 'User action removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyUserAction = async (req, res) => {
  try {
    const { isVerified } = req.body;
    
    const userAction = await UserAction.findById(req.params.id)
      .populate('action', 'createdBy');

    if (!userAction) {
      return res.status(404).json({ message: 'User action not found' });
    }

    if (
      req.user.role !== 'admin' &&
      req.user._id.toString() !== userAction.action.createdBy.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to verify this action' });
    }

    userAction.isVerified = isVerified;
    await userAction.save();

    const updatedUserAction = await UserAction.findById(userAction._id)
      .populate('user', 'name profilePicture')
      .populate('action', 'title category emissionSaved points');

    res.json(updatedUserAction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserActionStats = async (req, res) => {
  try {
    const { userId, period = '30' } = req.query;
    
    if (userId && req.user.role !== 'admin' && userId !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view these stats' });
    }
    const targetUserId = userId || req.user._id;
    const daysAgo = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);

    const stats = await UserAction.aggregate([
      {
        $match: {
          user: targetUserId,
          date: { $gte: startDate }
        }
      },
      {
        $lookup: {
          from: 'actions',
          localField: 'action',
          foreignField: '_id',
          as: 'actionDetails'
        }
      },
      { $unwind: '$actionDetails' },
      {
        $group: {
          _id: null,
          totalActions: { $sum: 1 },
          totalEmissionSaved: { $sum: '$emissionSaved' },
          totalPoints: { $sum: '$points' },
          categories: {
            $push: {
              category: '$actionDetails.category',
              emissionSaved: '$emissionSaved',
              points: '$points'
            }
          }
        }
      }
    ]);

    const categoryStats = await UserAction.aggregate([
      {
        $match: {
          user: targetUserId,
          date: { $gte: startDate }
        }
      },
      {
        $lookup: {
          from: 'actions',
          localField: 'action',
          foreignField: '_id',
          as: 'actionDetails'
        }
      },
      { $unwind: '$actionDetails' },
      {
        $group: {
          _id: '$actionDetails.category',
          count: { $sum: 1 },
          emissionSaved: { $sum: '$emissionSaved' },
          points: { $sum: '$points' }
        }
      }
    ]);

    res.json({
      period: `${period} days`,
      summary: stats[0] || { totalActions: 0, totalEmissionSaved: 0, totalPoints: 0 },
      categoryBreakdown: categoryStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

router.route('/')
  .get(protect, getUserActions)
  .post(protect, logUserAction);

router.route('/:id')
  .get(protect, getUserAction)
  .put(protect, updateUserAction)
  .delete(protect, deleteUserAction);
router.get('/', (req, res) => {
  res.json({ message: 'User actions route' });
});
router.put('/:id/verify', protect, verifyUserAction);
router.get('/stats', protect, getUserActionStats);

module.exports = router;
