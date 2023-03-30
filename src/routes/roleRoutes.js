const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController.js');
const {verifyToken}  = require('../middlewares/authMiddleware.js');

// Get all roles
router.get('/',verifyToken, roleController.getAllRoles);
// Create a new role
router.post('/', verifyToken, roleController.createRole);

// Get a specific role by id
router.get('/:id', verifyToken, roleController.getRoleById);

// Update a role by id
router.put('/:id', verifyToken, roleController.updateRoleById);

// Delete a role by id
router.delete('/:id', verifyToken, roleController.deleteRoleById);

module.exports = router;