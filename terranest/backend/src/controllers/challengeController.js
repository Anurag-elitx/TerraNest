import Challenge from '../models/Challenge.js';

export const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json(challenges);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createChallenge = async (req, res) => {
  try {
    const newChallenge = new Challenge(req.body);
    await newChallenge.save();
    res.status(201).json(newChallenge);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
