const User = require('../models/userModel');
const UserAction = require('../models/userAcctionModel');
const Challenge = require('../models/challengeModel');
const Post = require('../models/postModel');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('organization', 'name type')
      .populate('badges');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, email, profilePicture, location, bio } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.profilePicture = profilePicture || user.profilePicture;
    user.location = location || user.location;
    user.bio = bio || user.bio;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profilePicture: updatedUser.profilePicture,
      location: updatedUser.location,
      bio: updatedUser.bio,
      totalEmissionSaved: updatedUser.totalEmissionSaved,
      actionsCompleted: updatedUser.actionsCompleted,
      challengesJoined: updatedUser.challengesJoined
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .select('-password')
      .populate('badges');

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActions = await UserAction.find({
      user: userId,
      date: { $gte: thirtyDaysAgo }
    }).populate('action', 'title category emissionSaved points')
      .sort({ date: -1 })
      .limit(10);

    const activeChallenges = await Challenge.find({
      participants: userId,
      endDate: { $gte: new Date() },
      isActive: true
    }).populate('actions.action', 'title')
      .limit(5);

    const weeklyStats = await UserAction.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            week: { $week: '$date' },
            year: { $year: '$date' }
          },
          emissions: { $sum: '$emissionSaved' },
          points: { $sum: '$points' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.week': 1 } }
    ]);

    const categoryStats = await UserAction.aggregate([
      { $match: { user: userId } },
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
          emissions: { $sum: '$emissionSaved' },
          points: { $sum: '$points' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      user,
      recentActions,
      activeChallenges,
      weeklyStats,
      categoryStats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const { type = 'emissions', period = 'all', limit = 50 } = req.query;

    let matchStage = {};
    
    if (period !== 'all') {
      const now = new Date();
      let startDate;
      
      switch (period) {
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case 'year':
          startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
      }
      
      if (startDate) {
        matchStage.date = { $gte: startDate };
      }
    }

    let sortField;
    switch (type) {
      case 'points':
        sortField = 'totalPoints';
        break;
      case 'actions':
        sortField = 'totalActions';
        break;
      default:
        sortField = 'totalEmissions';
    }

    const leaderboard = await UserAction.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$user',
          totalEmissions: { $sum: '$emissionSaved' },
          totalPoints: { $sum: '$points' },
          totalActions: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
          pipeline: [
            {
              $project: {
                name: 1,
                profilePicture: 1,
                location: 1,
                role: 1
              }
            }
          ]
        }
      },
      { $unwind: '$user' },
      { $sort: { [sortField]: -1 } },
      { $limit: parseInt(limit) },
      {
        $project: {
          user: 1,
          totalEmissions: 1,
          totalPoints: 1,
          totalActions: 1,
          rank: { $add: [{ $indexOfArray: ['$$ROOT', '$$ROOT'] }, 1] }
        }
      }
    ]);

    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserActivity = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const userId = req.user.id;

    const actions = await UserAction.find({ user: userId })
      .populate('action', 'title category emissionSaved points')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const posts = await Post.find({ user: userId })
      .populate('user', 'name profilePicture')
      .sort({ createdAt: -1 })
      .limit(5);

    const challenges = await Challenge.find({
      $or: [
        { participants: userId },
        { completedBy: userId }
      ]
    }).sort({ updatedAt: -1 })
      .limit(5);

    res.json({
      actions,
      posts,
      challenges
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { q, role, location, page = 1, limit = 20 } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    let query = {
      isActive: true,
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { bio: { $regex: q, $options: 'i' } }
      ]
    };

    if (role && role !== 'all') {
      query.role = role;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const users = await User.find(query)
      .select('-password -email')
      .populate('organization', 'name type')
      .sort({ totalEmissionSaved: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserStats = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalStats = await UserAction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: null,
          totalEmissions: { $sum: '$emissionSaved' },
          totalPoints: { $sum: '$points' },
          totalActions: { $sum: 1 }
        }
      }
    ]);

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const monthlyProgress = await UserAction.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          emissions: { $sum: '$emissionSaved' },
          points: { $sum: '$points' },
          actions: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const categoryBreakdown = await UserAction.aggregate([
      { $match: { user: userId } },
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
          emissions: { $sum: '$emissionSaved' },
          points: { $sum: '$points' },
          count: { $sum: 1 }
        }
      }
    ]);

    const challengeStats = await Challenge.aggregate([
      {
        $match: {
          $or: [
            { participants: userId },
            { completedBy: userId }
          ]
        }
      },
      {
        $group: {
          _id: null,
          joined: { $sum: 1 },
          completed: {
            $sum: {
              $cond: [{ $in: [userId, '$completedBy'] }, 1, 0]
            }
          }
        }
      }
    ]);

    res.json({
      total: totalStats[0] || { totalEmissions: 0, totalPoints: 0, totalActions: 0 },
      monthlyProgress,
      categoryBreakdown,
      challenges: challengeStats[0] || { joined: 0, completed: 0 }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    await Challenge.updateMany(
      { participants: userId },
      { $pull: { participants: userId } }
    );

    await Challenge.updateMany(
      { completedBy: userId },
      { $pull: { completedBy: userId } }
    );

    await Post.deleteMany({ user: userId });

    await UserAction.deleteMany({ user: userId });

    await User.findByIdAndDelete(userId);

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserDashboard,
  getLeaderboard,
  getUserActivity,
  searchUsers,
  getUserStats,
  deleteUserAccount
};
