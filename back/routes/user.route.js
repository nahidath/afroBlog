const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// Sign up
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/refresh', userController.refresh);
router.get('/logout', userController.logout);
router.post('/updateProfile', userController.updateProfile);
router.post('/updateFavArticles', userController.updateFavArticles);

module.exports = router;