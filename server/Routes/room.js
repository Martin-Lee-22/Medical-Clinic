const express = require('express');
const router = express.Router();
const roomErrorHandler =  require('../middleware/errorHandlers/roomErrorHandler');
const {createRoom, getRooms, getRoom, deleteRoom, updateRoom} = require('../Controllers/room')

router.get('/', getRooms);
router.get('/:id', getRoom);
router.post('/register', createRoom);
router.delete('/:id', deleteRoom);
router.patch('/:id', updateRoom);

// Error Handler
router.use(roomErrorHandler)

module.exports = router