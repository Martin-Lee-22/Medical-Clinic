const express = require('express');
const router = express.Router();
const appointmentErrorHandler =  require('../middleware/errorHandlers/appointmentErrorHandler');
const {createAppointment, getAppointment, getAppointmentsByPatientID,  getAppointments, deleteAppointment, updateAppointment, getAppointmentsByDateClinicDoctorID} = require('../Controllers/appointment')
const verifyJWT = require('../middleware/verifyJWT.js')

// Middlewares
// router.use(verifyJWT)

router.get('/', getAppointments);
router.get('/query', getAppointmentsByDateClinicDoctorID);
router.get('/query', getAppointmentsByPatientID);
router.get('/:id', getAppointment);
router.post('/register', createAppointment);
router.delete('/:id', deleteAppointment);
router.patch('/:id', updateAppointment);

// Error Handler
router.use(appointmentErrorHandler)

module.exports = router