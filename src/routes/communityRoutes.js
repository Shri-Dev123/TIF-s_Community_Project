const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET all communities
router.get('/', communityController.getAllCommunities);

// GET a specific community by ID
router.get('/:id', communityController.getCommunityById);

// POST a new community
router.post('/', authMiddleware.verifyToken, communityController.createCommunity);

// PUT (update) an existing community by ID
router.put('/:id', authMiddleware.verifyToken, communityController.updateCommunityById);

// DELETE a community by ID
router.delete('/:id', authMiddleware.verifyToken, communityController.deleteCommunityById);

// GET all communities owned by the user
router.get('/owned', authMiddleware.verifyToken, communityController.getOwnedCommunities);

// GET all communities the user is a member of
router.get('/joined', authMiddleware.verifyToken, communityController.getJoinedCommunities);


module.exports = router;
