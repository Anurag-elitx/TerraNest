import Action from '../models/Action.js';

export const getAllActions = async (req, res) => {
  try {
    const actions = await Action.find();
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createAction = async (req, res) => {
  try {
    const newAction = new Action(req.body);
    await newAction.save();
    res.status(201).json(newAction);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
