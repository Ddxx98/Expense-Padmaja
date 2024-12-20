const express = require('express');

const signupController = require('../controllers/singnup');

const router = express.Router();

router.post('/', signupController.createUser);

module.exports = router;