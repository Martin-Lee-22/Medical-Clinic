const express = require('express');
const router = express.Router();
const patientErrorHandler =  require('../middleware/errorHandlers/patientErrorHandler');
const {createPatient, getPatient, getPatients, deletePatient, updatePatient, getPatientsViaClinicID} = require('../Controllers/patient');
const verifyJWT = require('../middleware/verifyJWT.js')

// Middlewares
router.use(verifyJWT)

router.get('/', getPatients)
router.get('/query', getPatientsViaClinicID)
router.get('/:id', getPatient)
router.post('/register', createPatient)
router.delete('/:id', deletePatient)
router.patch('/:id', updatePatient)

// Error Handler
router.use(patientErrorHandler)

module.exports = router