import UserAction from '../models/UserAction.js';

export const getUserActions = async (req, res) => {
  try {
    const actions = await UserAction.find({ userId: req.params.userId });
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createUserAction = async (req, res) => {
  try {
    const newAction = new UserAction(req.body);
    await newAction.save();
    res.status(201).json(newAction);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};