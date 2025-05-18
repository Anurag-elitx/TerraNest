import Organization from '../models/Organization.js';

export const getAllOrganizations = async (req, res) => {
  try {
    const orgs = await Organization.find();
    res.status(200).json(orgs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createOrganization = async (req, res) => {
  try {
    const newOrg = new Organization(req.body);
    await newOrg.save();
    res.status(201).json(newOrg);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
