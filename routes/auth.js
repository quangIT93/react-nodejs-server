const express = require('express');

const router = express.Router();

const verrifyToken = require('../middlewave/auth');
const authController = require('../Controllers/AuthController');
router.get('/', verrifyToken, authController.home);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
