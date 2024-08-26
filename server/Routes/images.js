const express = require('express');
const router = express.Router();
const {createUpdateImage, getImage} = require('../Controllers/images.js')
const verifyJWT = require('../middleware/verifyJWT.js')

// Middlewares
// router.use(verifyJWT)

router.get('/:id', getImage);
router.patch('/upload-image/:id', createUpdateImage);


module.exports = router