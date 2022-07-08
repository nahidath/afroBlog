const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article.controller');

// get all articles
router.get('/all', articleController.getAllArticle)
//get all articles by category
router.get('/category', articleController.getArticleBySubcategory)
//get article by his id
router.get('/article', articleController.getArticleByID)
//get randoms articles
router.get('/randoms', articleController.getRandomArticles)

module.exports = router;