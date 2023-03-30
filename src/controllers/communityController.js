const Community = require('../models/community');
const Member = require('../models/member');
const { ErrorHandler } = require('../helpers/error');

// Create a new community
const createCommunity = async (req, res, next) => {
  const { name } = req.body;
  const slug = name.replace(/\s+/g, '-').toLowerCase();
  const ownerId = req.user._id
  console.log(ownerId)
  try {
    // Check if community with the same name already exists
    const existingCommunity = await Community.findOne({ name });
    if (existingCommunity) {
      throw new ErrorHandler(400, 'Community with the same name already exists');
    }

    const community = await Community.create({
      name,
      slug,
      owner: ownerId
    });

    // Add the owner as a member with Community Admin role
    const member = await Member.create({
      community: community.id,
      user: ownerId,
      roles: req.user.iat
    });

    res.status(201).json({ community, member });
  } catch (err) {
    next(err);
  }
};




// Get all communities
const getAllCommunities = async (req, res, next) => {
  try {
    const communities = await Community.find();
    res.status(200).json(communities);
  } catch (err) {
    next(err);
  }
};

// Get all members of a community
const getAllMembersOfACommunity = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // Check if the user is a member of the community
    const member = await Member.findOne({ community: id, user: userId });
    if (!member) {
      throw new ErrorHandler(403, 'Access Denied');
    }

    const members = await Member.find({ community: id }).populate('user');

    res.status(200).json(members);
  } catch (err) {
    next(err);
  }
};

// Get all communities owned by the user
const getOwnedCommunities = async (req, res, next) => {
  const ownerId = req.user.id;

  try {
    const communities = await Community.find({ owner: ownerId });
    res.status(200).json(communities);
  } catch (err) {
    next(err);
  }
};

// Get all communities the user is a member of
const getJoinedCommunities = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const members = await Member.find({ user: userId }).populate('community');
    const communities = members.map(member => member.community);

    res.status(200).json(communities);
  } catch (err) {
    next(err);
  }
};

// Get a community by ID
const getCommunityById = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const community = await Community.findById(id);
      if (!community) {
        throw new ErrorHandler(404, 'Community not found');
      }
  
      res.status(200).json(community);
    } catch (err) {
      next(err);
    }
  };
  
  // Update a community by ID
const updateCommunityById = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const slug = name.replace(/\s+/g, '-').toLowerCase();
    const ownerId = req.user.id;
  
    try {
      const existingCommunity = await Community.findOne({ _id: { $ne: id }, name });
      if (existingCommunity) {
        throw new ErrorHandler(400, 'Community with the same name already exists');
      }
  
      const community = await Community.findOneAndUpdate(
        { _id: id, owner: ownerId },
        { name, slug },
        { new: true }
      );
      if (!community) {
        throw new ErrorHandler(404, 'Community not found or user is not the owner');
      }
  
      res.status(200).json(community);
    } catch (err) {
      next(err);
    }
  };
  
  // Delete a community by ID
  const deleteCommunityById = async (req, res, next) => {
    const { id } = req.params;
    const ownerId = req.user.id;
  
    try {
      const community = await Community.findOneAndDelete({ _id: id, owner: ownerId });
      if (!community) {
        throw new ErrorHandler(404, 'Community not found or user is not the owner');
      }
  
      // Delete all members of the community
      await Member.deleteMany({ community: id });
  
      res.status(200).json({ message: 'Community deleted successfully' });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {
    createCommunity,
    updateCommunityById,
    deleteCommunityById,
    getAllCommunities,
    getCommunityById,
    getJoinedCommunities,
    getOwnedCommunities
  }