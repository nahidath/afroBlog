const commentService = require('../services/comment.service');

exports.addComment = async function (req, res, next) {
    try {
        res.json(await commentService.addComment(req.query));
    } catch (err) {
        console.error('Error while add comment', err.message);
        next(err);
    }
}