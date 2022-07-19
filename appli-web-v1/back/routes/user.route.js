const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// Sign up
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/user', userController.getUserInfos);
router.post('/updateProfile', userController.updateUserProfile);
router.post('/updateFavArticles', userController.updateFavArticles);
router.get('/favListArt', userController.getFavArticlesByUser);

module.exports = router;