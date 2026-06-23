// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/api/auth/register', authController.register);
router.post('/api/auth/login', authController.login);
router.get('/api/auth/me', auth, authController.getMe);

router.post('/api/auth/forgot-password', authController.forgotPassword);
router.post('/api/auth/verify-reset-code', authController.verifyResetCode);
router.post('/api/auth/reset-password', authController.resetPassword);

module.exports = router;
