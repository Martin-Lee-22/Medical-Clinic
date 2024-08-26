const express = require('express');
const router = express.Router();
const {getUsers, createUser, getUser, updateUser, deleteUser} = require('../Controllers/user.js');
const userErrorHandler = require('../middleware/errorHandlers/userErrorHandler.js')
const verifyJWT = require('../middleware/verifyJWT.js')

// Middleware
// router.use(verifyJWT)

// Routes
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/register', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

// Error Handler
router.use(userErrorHandler)

module.exports = router;