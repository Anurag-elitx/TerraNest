const Challenge = require('../models/challengeModel');
const User = require('../models/userModel');
const UserAction = require('../models/userActionModel');

const getChallenges = async (req, res) => {
  try {
    const { category, level, scope, search } = req.query;
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

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const now = new Date();
    query.endDate = { $gte: now };

    const challenges = await Challenge.find(query)
      .populate('createdBy', 'name')
      .populate('organization', 'name')
      .populate('actions.action', 'title description emissionSaved points')
      .sort({ startDate: 1 });

    res.json(challenges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('organization', 'name type')
      .populate('actions.action', 'title description emissionSaved points category')
      .populate('participants', 'name profilePicture')
      .populate('completedBy', 'name profilePicture');

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    res.json(challenge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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

    if (req.user.role !== 'admin' && req.user.role !== 'corporate' && req.user.role !== 'school') {
      return res.status(403).json({ message: 'Not authorized to create challenges' });
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ message: 'End date must be after start date' });
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
      createdBy: req.user.id
    });

    const populatedChallenge = await Challenge.findById(challenge._id)
      .populate('createdBy', 'name')
      .populate('actions.action', 'title description emissionSaved points');

    res.status(201).json(populatedChallenge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (req.user.role !== 'admin' && challenge.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this challenge' });
    }

    const updatedChallenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name')
     .populate('actions.action', 'title description emissionSaved points');

    res.json(updatedChallenge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (req.user.role !== 'admin' && challenge.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this challenge' });
    }

    await Challenge.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({ message: 'Challenge deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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
      return res.status(400).json({ message: 'Challenge has ended' });
    }

    if (challenge.participants.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already joined this challenge' });
    }

    challenge.participants.push(req.user.id);
    await challenge.save();

    await User.findByIdAndUpdate(req.user.id, {
      $inc: { challengesJoined: 1 }
    });

    res.json({ message: 'Successfully joined challenge' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const leaveChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (!challenge.participants.includes(req.user.id)) {
      return res.status(400).json({ message: 'Not a participant in this challenge' });
    }

    challenge.participants = challenge.participants.filter(
      participant => participant.toString() !== req.user.id
    );
    await challenge.save();

    await User.findByIdAndUpdate(req.user.id, {
      $inc: { challengesJoined: -1 }
    });

    res.json({ message: 'Successfully left challenge' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getChallengeProgress = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('actions.action', 'title category emissionSaved points');

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (!challenge.participants.includes(req.user.id)) {
      return res.status(400).json({ message: 'Not a participant in this challenge' });
    }

    const userActions = await UserAction.find({
      user: req.user.id,
      date: {
        $gte: challenge.startDate,
        $lte: challenge.endDate
      }
    }).populate('action', 'title category');

    const progress = challenge.actions.map(challengeAction => {
      const completedCount = userActions.filter(
        ua => ua.action._id.toString() === challengeAction.action._id.toString()
      ).length;

      return {
        action: challengeAction.action,
        required: challengeAction.count,
        completed: completedCount,
        percentage: Math.min((completedCount / challengeAction.count) * 100, 100)
      };
    });

    const totalRequired = challenge.actions.reduce((sum, action) => sum + action.count, 0);
    const totalCompleted = progress.reduce((sum, p) => sum + Math.min(p.completed, p.required), 0);
    const overallProgress = totalRequired > 0 ? (totalCompleted / totalRequired) * 100 : 0;

    const isCompleted = progress.every(p => p.completed >= p.required);

    if (isCompleted && !challenge.completedBy.includes(req.user.id)) {
      challenge.completedBy.push(req.user.id);
      await challenge.save();
    }

    res.json({
      challengeId: challenge._id,
      title: challenge.title,
      progress,
      overallProgress: Math.round(overallProgress),
      isCompleted,
      startDate: challenge.startDate,
      endDate: challenge.endDate
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserChallenges = async (req, res) => {
  try {
    const { status } = req.query;

    let query = { participants: req.user.id };
    const now = new Date();

    if (status === 'active') {
      query.endDate = { $gte: now };
      query.completedBy = { $ne: req.user.id };
    } else if (status === 'completed') {
      query.completedBy = req.user.id;
    }

    const challenges = await Challenge.find(query)
      .populate('actions.action', 'title category')
      .sort({ startDate: -1 });

    res.json(challenges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getChallengeLeaderboard = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    const leaderboard = [];

    for (const participantId of challenge.participants) {
      const userActions = await UserAction.find({
        user: participantId,
        date: {
          $gte: challenge.startDate,
          $lte: challenge.endDate
        }
      }).populate('action');

      let totalPoints = 0;
      let totalEmissions = 0;
      let completedActions = 0;

      challenge.actions.forEach(challengeAction => {
        const userCompletedCount = userActions.filter(
          ua => ua.action._id.toString() === challengeAction.action.toString()
        ).length;

        const countToConsider = Math.min(userCompletedCount, challengeAction.count);
        completedActions += countToConsider;
      });

      userActions.forEach(ua => {
        totalPoints += ua.points;
        totalEmissions += ua.emissionSaved;
      });

      const user = await User.findById(participantId).select('name profilePicture');
      
      leaderboard.push({
        user,
        totalPoints,
        totalEmissions,
        completedActions,
        isCompleted: challenge.completedBy.includes(participantId)
      });
    }

    leaderboard.sort((a, b) => {
      if (a.isCompleted && !b.isCompleted) return -1;
      if (!a.isCompleted && b.isCompleted) return 1;
      return b.totalPoints - a.totalPoints;
    });

    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getChallenges,
  getChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  joinChallenge,
  leaveChallenge,
  getChallengeProgress,
  getUserChallenges,
  getChallengeLeaderboard
};
