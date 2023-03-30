const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const {roleMiddleware} = require('../middlewares/roleMiddleware');


router.post('/signup', authController.signup);
router.post('/login', authController.signin);
router.post('/refresh-token', authController.refreshToken);
router.get('/users/me', roleMiddleware(['admin', 'user']), authController.getMe);
module.exports = router;
