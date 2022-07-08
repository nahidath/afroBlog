const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article.controller');

// get all articles
router.get('/all', articleController.getAllArticle)
//get all articles by category
router.get('/category', articleController.getArticleBySubcategory)
//get all articles by sub category
// router.get('/sub/:category/:subcategory', articleController.getArticleBySubcategory)

module.exports = router;