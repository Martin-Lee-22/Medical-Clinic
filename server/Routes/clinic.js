const express = require('express');
const router = express.Router();
const clinicErrorHandler =  require('../middleware/errorHandlers/clinicErrorHandler');
const {createClinic, getClinic, getClinics, deleteClinic, updateClinic} =  require('../Controllers/clinic');
const verifyJWT = require('../middleware/verifyJWT.js')

// Middlewares
// router.use(verifyJWT)

router.get('/', getClinics);
router.get('/:id', getClinic);
router.post('/register', createClinic);
router.delete('/:id', deleteClinic);
router.patch('/:id', updateClinic);

// Error Handler
router.use(clinicErrorHandler)

module.exports = router