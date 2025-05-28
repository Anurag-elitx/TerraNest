const express = require('express');
const Organization = require('../models/organizationModel');
const User = require('../models/userModel');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

const getOrganizations = async (req, res) => {
  try {
    const { type, search, page = 1, limit = 10 } = req.query;
    
    let query = { isActive: true };
    
    if (type && type !== 'all') {
      query.type = type;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const organizations = await Organization.find(query)
      .populate('admin', 'name email')
      .populate('members', 'name profilePicture')
      .sort({ createdAt: -1 })
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
    res.status(500).json({ message: error.message });
  }
};

const getOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id)
      .populate('admin', 'name email profilePicture')
      .populate('members', 'name profilePicture totalEmissionSaved actionsCompleted');
    
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      description,
      adminId
    } = req.body;

    const adminUser = await User.findById(adminId);
    if (!adminUser) {
      return res.status(404).json({ message: 'Admin user not found' });
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
      admin: adminId,
      members: [adminId]
    });

    await User.findByIdAndUpdate(adminId, {
      organization: organization._id,
      role: type === 'school' ? 'school' : 'corporate'
    });

    const populatedOrganization = await Organization.findById(organization._id)
      .populate('admin', 'name email')
      .populate('members', 'name profilePicture');

    res.status(201).json(populatedOrganization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    if (req.user.role !== 'admin' && organization.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this organization' });
    }

    const updatedOrganization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('admin', 'name email')
     .populate('members', 'name profilePicture');

    res.json(updatedOrganization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete organizations' });
    }

    await User.updateMany(
      { organization: req.params.id },
      { $unset: { organization: 1 }, role: 'public' }
    );

    await Organization.findByIdAndDelete(req.params.id);

    res.json({ message: 'Organization removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const joinOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    if (organization.members.includes(req.user._id)) {
      return res.status(400).json({ message: 'You are already a member of this organization' });
    }

    organization.members.push(req.user._id);
    await organization.save();

    await User.findByIdAndUpdate(req.user._id, {
      organization: organization._id,
      role: organization.type === 'school' ? 'school' : 'corporate'
    });

    const updatedOrganization = await Organization.findById(organization._id)
      .populate('admin', 'name email')
      .populate('members', 'name profilePicture');

    res.json(updatedOrganization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const leaveOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    if (!organization.members.includes(req.user._id)) {
      return res.status(400).json({ message: 'You are not a member of this organization' });
    }

    if (organization.admin.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Admin cannot leave the organization. Transfer admin rights first.' });
    }

    organization.members = organization.members.filter(
      member => member.toString() !== req.user._id.toString()
    );
    await organization.save();

    await User.findByIdAndUpdate(req.user._id, {
      $unset: { organization: 1 },
      role: 'public'
    });

    const updatedOrganization = await Organization.findById(organization._id)
      .populate('admin', 'name email')
      .populate('members', 'name profilePicture');

    res.json(updatedOrganization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const transferAdmin = async (req, res) => {
  try {
    const { newAdminId } = req.body;
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    if (organization.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only current admin can transfer admin rights' });
    }

    if (!organization.members.includes(newAdminId)) {
      return res.status(400).json({ message: 'New admin must be a member of the organization' });
    }

    organization.admin = newAdminId;
    await organization.save();

    await User.findByIdAndUpdate(req.user._id, {
      role: organization.type === 'school' ? 'school' : 'corporate'
    });

    const updatedOrganization = await Organization.findById(organization._id)
      .populate('admin', 'name email')
      .populate('members', 'name profilePicture');

    res.json(updatedOrganization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrganizationStats = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id)
      .populate('members', 'totalEmissionSaved actionsCompleted challengesJoined');

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    // Calculate aggregated stats
    const stats = organization.members.reduce((acc, member) => {
      acc.totalEmissionSaved += member.totalEmissionSaved || 0;
      acc.totalActionsCompleted += member.actionsCompleted || 0;
      acc.totalChallengesJoined += member.challengesJoined || 0;
      return acc;
    }, {
      totalMembers: organization.members.length,
      totalEmissionSaved: 0,
      totalActionsCompleted: 0,
      totalChallengesJoined: 0
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrganizationLeaderboard = async (req, res) => {
  try {
    const { metric = 'totalEmissionSaved', limit = 10 } = req.query;
    
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const sortField = {};
    sortField[metric] = -1;

    const leaderboard = await User.find({ 
      organization: req.params.id 
    })
      .select('name profilePicture totalEmissionSaved actionsCompleted challengesJoined')
      .sort(sortField)
      .limit(parseInt(limit));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

router.route('/')
  .get(getOrganizations)
  .post(protect, authorize('admin'), createOrganization);

router.route('/:id')
  .get(getOrganization)
  .put(protect, updateOrganization)
  .delete(protect, authorize('admin'), deleteOrganization);

router.post('/:id/join', protect, joinOrganization);
router.post('/:id/leave', protect, leaveOrganization);
router.put('/:id/transfer-admin', protect, transferAdmin);
router.get('/:id/stats', getOrganizationStats);
router.get('/:id/leaderboard', getOrganizationLeaderboard);

module.exports = router;

