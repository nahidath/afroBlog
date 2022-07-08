const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment.controller');

// post comment
router.post('/add', commentController.addComment)
// //get comment for article to display
// router.get('/allComments', commentController.getCommentsArticle)


module.exports = router;