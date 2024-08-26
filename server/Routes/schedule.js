const express = require('express');
const router = express.Router();
const scheduleErrorHandler =  require('../middleware/errorHandlers/scheduleErrorHandler');
const  {createSchedule, getSchedule, getSchedules, deleteSchedule, updateSchedule} = require('../Controllers/schedule');

router.get('/', getSchedules);
router.get('/:id', getSchedule);
router.post('/register', createSchedule);
router.delete('/:id', deleteSchedule);
router.patch('/:id', updateSchedule);

// Error Handler
router.use(scheduleErrorHandler)

module.exports = router