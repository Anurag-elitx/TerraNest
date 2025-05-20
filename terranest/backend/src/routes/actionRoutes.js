
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

