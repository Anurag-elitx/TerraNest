const express = require('express');
const Action = require('../models/actionModel');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

const getActions = async (req, res) => {
  try {
    const { category, frequency, page = 1, limit = 10, search } = req.query;
    
    let query = { isActive: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (frequency && frequency !== 'all') {
      query.frequency = frequency;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const actions = await Action.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Action.countDocuments(query);

    res.json({
      actions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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

    const action = await Action.create({
      title,
      description,
      category,
      emissionSaved,
      points,
      icon,
      frequency,
      createdBy: req.user._id
    });

    const populatedAction = await Action.findById(action._id)
      .populate('createdBy', 'name');

    res.status(201).json(populatedAction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAction = async (req, res) => {
  try {
    const action = await Action.findById(req.params.id);

    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }

    if (req.user.role !== 'admin' && action.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this action' });
    }

    const updatedAction = await Action.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name');

    res.json(updatedAction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAction = async (req, res) => {
  try {
    const action = await Action.findById(req.params.id);

    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }

    if (req.user.role !== 'admin' && action.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this action' });
    }

    await Action.findByIdAndDelete(req.params.id);

    res.json({ message: 'Action removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      user: req.user._id,
      action: action._id,
      date: { $gte: today }
    });

    if (existingLog) {
      return res.status(400).json({ message: 'You have already logged this action today' });
    }

    const userAction = await UserAction.create({
      user: req.user._id,
      action: action._id,
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

    res.status(201).json(userAction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserActionHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const userActions = await UserAction.find({ user: req.user._id })
      .populate('action', 'title category emissionSaved points')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await UserAction.countDocuments({ user: req.user._id });

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

router.route('/')
  .get(getActions)
  .post(protect, authorize('admin'), createAction);

router.route('/:id')
  .get(getAction)
  .put(protect, updateAction)
  .delete(protect, deleteAction);

router.post('/:id/log', protect, logUserAction);
router.get('/user/history', protect, getUserActionHistory);

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const Action = require('../models/actionModel');

router.get('/', async (req, res) => {
  try {
    const actions = await Action.find();
    res.json(actions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const action = await Action.findById(req.params.id);
    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }
    res.json(action);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;