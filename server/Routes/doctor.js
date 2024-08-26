const express = require('express');
const router = express.Router();
const doctorErrorHandler =  require('../middleware/errorHandlers/doctorErrorHandler');
const {createDoctor, getDoctors, getDoctor, deleteDoctor, updateDoctor} = require('../Controllers/doctor');
const verifyJWT = require('../middleware/verifyJWT.js')

// Middlewares
// router.use(verifyJWT)

router.get('/', getDoctors);
router.get('/:id', getDoctor);
router.post('/register', createDoctor);
router.delete('/:id', deleteDoctor);
router.patch('/:id', updateDoctor);

// Error Handler
router.use(doctorErrorHandler)

module.exports = router