const commentService = require('../services/comment.service');

exports.addComment = async function (req, res, next) {
    try {
        res.json(await commentService.addComment(req.body.data));
    } catch (err) {
        console.error('Error while add comment', err.message);
        next(err);
    }
}

exports.getCommentsArticle = async function (req, res, next) {
    try {
        res.json(await commentService.getCommentsArticle(req.query.articleID));
    } catch (err) {
        console.error('Error while add comment', err.message);
        next(err);
    }
}
