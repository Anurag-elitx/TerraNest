const Action = require('../models/actionModel');
const UserAction = require('../models/userAcctionModel');
const User = require('../models/userModel');

const getActions = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { isActive: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const actions = await Action.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    res.json(actions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAction = async (req, res) => {
  try {
    const action = await Action.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }

    res.json(action);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createAction = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      emissionSaved,
      points,
      icon,
      frequency
    } = req.body;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to create actions' });
    }

    const action = await Action.create({
      title,
      description,
      category,
      emissionSaved,
      points,
      icon,
      frequency,
      createdBy: req.user.id
    });

    res.status(201).json(action);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAction = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update actions' });
    }

    const action = await Action.findById(req.params.id);

    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }

    const updatedAction = await Action.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedAction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAction = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete actions' });
    }

    const action = await Action.findById(req.params.id);

    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }

    await Action.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({ message: 'Action deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const logUserAction = async (req, res) => {
  try {
    const action = await Action.findById(req.params.id);
    
    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }

    const { notes, proof } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLog = await UserAction.findOne({
      user: req.user.id,
      action: req.params.id,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (existingLog) {
      return res.status(400).json({ message: 'Action already logged today' });
    }

    const userAction = await UserAction.create({
      user: req.user.id,
      action: req.params.id,
      emissionSaved: action.emissionSaved,
      points: action.points,
      notes,
      proof
    });

    await User.findByIdAndUpdate(req.user.id, {
      $inc: {
        totalEmissionSaved: action.emissionSaved,
        actionsCompleted: 1
      }
    });

    res.status(201).json(userAction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserActions = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    let query = { user: req.user.id };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const userActions = await UserAction.find(query)
      .populate('action', 'title category emissionSaved points')
      .sort({ date: -1 });

    let filteredActions = userActions;
    if (category && category !== 'all') {
      filteredActions = userActions.filter(ua => ua.action.category === category);
    }

    res.json(filteredActions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserActionStats = async (req, res) => {
  try {
    const userId = req.user.id;

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

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActivity = await UserAction.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$date' }
          },
          emissions: { $sum: '$emissionSaved' },
          points: { $sum: '$points' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      total: totalStats[0] || { totalEmissions: 0, totalPoints: 0, totalActions: 0 },
      byCategory: categoryStats,
      recentActivity
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getActions,
  getAction,
  createAction,
  updateAction,
  deleteAction,
  logUserAction,
  getUserActions,
  getUserActionStats
};
