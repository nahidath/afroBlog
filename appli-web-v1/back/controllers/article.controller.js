const articleService = require('../services/article.service');

exports.getAllArticle = async function (req, res, next) {
    try {
        res.json(await articleService.getAllArticle());
    } catch (err) {
        console.error('Error while get all articles', err.message);
        next(err);
    }
}

exports.getArticleByCategory = async function (req, res, next) {
    try {
        res.json(await articleService.getArticleByCategory(req.body.data));
    } catch (err) {
        console.error('Error while get articles from category', err.message);
        next(err);
    }
}

exports.getArticleBySubcategory = async function (req, res, next) {
    try {
        res.json(await articleService.getArticleBySubcategory(req.body.data));
    } catch (err) {
        console.error('Error while get articles from sub category', err.message);
        next(err);
    }
}
