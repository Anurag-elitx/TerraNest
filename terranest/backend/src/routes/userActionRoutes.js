const express = require('express');
const router = express.Router();
const UserAction = require('../models/userAcctionModel');

router.get('/', async (req, res) => {
  try {
    const userActions = await UserAction.find();
    res.json(userActions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userAction = await UserAction.findById(req.params.id);
    if (!userAction) {
      return res.status(404).json({ message: 'User action not found' });
    }
    res.json(userAction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
