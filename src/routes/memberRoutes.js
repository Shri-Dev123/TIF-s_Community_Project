const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to get all members
router.get('/', authMiddleware.verifyToken, memberController.getAllMembers);

// Route to create a new member
router.post('/', authMiddleware.verifyToken, memberController.createMember);

// Route to get a specific member by ID
router.get('/:id', authMiddleware.verifyToken, memberController.getMemberById);

// Route to update a specific member by ID
router.put('/:id', authMiddleware.verifyToken, memberController.updateMemberById);

// Route to delete a specific member by ID
router.delete('/:id', authMiddleware.verifyToken, memberController.deleteMemberById);

module.exports = router;
