const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// Sign up
router.post('/signup', userController.signup);


module.exports = router;