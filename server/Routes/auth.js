const express = require('express');
const router = express.Router();
const {login, refresh, logout} = require('../Controllers/auth.js');
const userErrorHandler = require('../middleware/errorHandlers/userErrorHandler.js')
const loginLimiter = require('../middleware/loginLimiter.js')

// Routes
router.post('/login', loginLimiter, login)
router.get('/refresh', refresh)
router.get('/logout', logout)

// Error Handler
router.use(userErrorHandler)

module.exports = router;