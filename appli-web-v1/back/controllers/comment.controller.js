const commentService = require('../services/comment.service');

exports.addComment = async function (req, res, next) {
    console.log(req.body.data)
    try {
        res.json(await commentService.addComment(req.body.data));
    } catch (err) {
        console.error('Error while add comment', err.message);
        next(err);
    }
}