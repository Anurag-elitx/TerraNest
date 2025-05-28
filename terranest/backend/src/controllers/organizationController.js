const Organization = require('../models/organizationModel');
const User = require('../models/userModel');
const Challenge = require('../models/challengeModel');
const Post = require('../models/postModel');

const getOrganizations = async (req, res) => {
  try {
    const { type, search, verified, page = 1, limit = 20 } = req.query;
    let query = { isActive: true };

    if (type && type !== 'all') {
      query.type = type;
    }

    if (verified !== undefined) {
      query.isVerified = verified === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const organizations = await Organization.find(query)
      .populate('admin', 'name email')
      .select('-members')
      .sort({ totalEmissionSaved: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Organization.countDocuments(query);

    res.json({
      organizations,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id)
      .populate('admin', 'name email profilePicture')
      .populate('members', 'name profilePicture totalEmissionSaved');

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.json(organization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createOrganization = async (req, res) => {
  try {
    const {
      name,
      type,
      email,
      phone,
      address,
      website,
      logo,
      description
    } = req.body;

    const existingOrg = await Organization.findOne({ email });
    if (existingOrg) {
      return res.status(400).json({ message: 'Organization with this email already exists' });
    }

    const organization = await Organization.create({
      name,
      type,
      email,
      phone,
      address,
      website,
      logo,
      description,
      admin: req.user.id,
      members: [req.user.id]
    });

    await User.findByIdAndUpdate(req.user.id, {
      organization: organization._id,
      role: type === 'corporate' ? 'corporate' : 'school'
    });

    const populatedOrganization = await Organization.findById(organization._id)
      .populate('admin', 'name email');

    res.status(201).json(populatedOrganization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    if (organization.admin.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this organization' });
    }

    const updatedOrganization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('admin', 'name email');

    res.json(updatedOrganization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    if (organization.admin.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this organization' });
    }

    await User.updateMany(
      { organization: req.params.id },
      { $unset: { organization: 1 }, role: 'public' }
    );

    await Organization.findByIdAndDelete(req.params.id);

    res.json({ message: 'Organization deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const joinOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    if (organization.members.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already a member of this organization' });
    }

    organization.members.push(req.user.id);
    await organization.save();

    await User.findByIdAndUpdate(req.user.id, {
      organization: organization._id,
      role: organization.type === 'corporate' ? 'corporate' : 'school'
    });

    res.json({ message: 'Successfully joined organization' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const leaveOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    if (organization.admin.toString() === req.user.id) {
      return res.status(400).json({ message: 'Organization admin cannot leave. Transfer admin rights first.' });
    }

    if (!organization.members.includes(req.user.id)) {
      return res.status(400).json({ message: 'Not a member of this organization' });
    }

    organization.members = organization.members.filter(
      member => member.toString() !== req.user.id
    );
    await organization.save();

    await User.findByIdAndUpdate(req.user.id, {
      $unset: { organization: 1 },
      role: 'public'
    });

    res.json({ message: 'Successfully left organization' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrganizationStats = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const memberStats = await User.aggregate([
      { $match: { organization: organization._id } },
      {
        $group: {
          _id: null,
          totalMembers: { $sum: 1 },
          totalEmissions: { $sum: '$totalEmissionSaved' },
          totalActions: { $sum: '$actionsCompleted' },
          totalChallenges: { $sum: '$challengesJoined' }
        }
      }
    ]);

    const organizationChallenges = await Challenge.countDocuments({
      organization: organization._id,
      isActive: true
    });

    const organizationPosts = await Post.countDocuments({
      organization: organization._id,
      isApproved: true
    });

    const topPerformers = await User.find({
      organization: organization._id
    }).select('name profilePicture totalEmissionSaved actionsCompleted')
      .sort({ totalEmissionSaved: -1 })
      .limit(10);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyProgress = await User.aggregate([
      { $match: { organization: organization._id } },
      {
        $lookup: {
          from: 'useractions',
          localField: '_id',
          foreignField: 'user',
          as: 'actions'
        }
      },
      { $unwind: '$actions' },
      {
        $match: {
          'actions.date': { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$actions.date' },
            month: { $month: '$actions.date' }
          },
          emissions: { $sum: '$actions.emissionSaved' },
          actions: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      organization: {
        name: organization.name,
        type: organization.type,
        totalEmissionSaved: organization.totalEmissionSaved,
        treesPlanted: organization.treesPlanted,
        challengesCompleted: organization.challengesCompleted
      },
      stats: memberStats[0] || {
        totalMembers: 0,
        totalEmissions: 0,
        totalActions: 0,
        totalChallenges: 0
      },
      organizationChallenges,
      organizationPosts,
      topPerformers,
      monthlyProgress
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrganizationMembers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    if (!organization.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized to view organization members' });
    }

    let query = { organization: req.params.id };

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const members = await User.find(query)
      .select('name email profilePicture role totalEmissionSaved actionsCompleted challengesJoined')
      .sort({ totalEmissionSaved: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      members,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const transferAdmin = async (req, res) => {
  try {
    const { newAdminId } = req.body;

    if (!newAdminId) {
      return res.status(400).json({ message: 'New admin ID is required' });
    }

    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    if (organization.admin.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only current admin can transfer admin rights' });
    }

    if (!organization.members.includes(newAdminId)) {
      return res.status(400).json({ message: 'New admin must be a member of the organization' });
    }

    organization.admin = newAdminId;
    await organization.save();

    res.json({ message: 'Admin rights transferred successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  joinOrganization,
  leaveOrganization,
  getOrganizationStats,
  getOrganizationMembers,
  transferAdmin
};
