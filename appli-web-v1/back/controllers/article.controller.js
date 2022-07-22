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
        res.json(await articleService.getArticleByCategory(req.query));
    } catch (err) {
        console.error('Error while get articles from category', err.message);
        next(err);
    }
}

exports.getArticleBySubcategory = async function (req, res, next) {
    try {
        res.json(await articleService.getArticleBySubcategory(req.query.category, req.query.subCategory));
    } catch (err) {
        console.error('Error while get articles from sub category', err.message);
        next(err);
    }
}

exports.getArticleByID =  async function (req, res, next) {
    try {
        res.json(await articleService.getArticleByID(req.query._id));

    } catch (err) {
        console.error('Error while getting article : ', err.message);
        next(err);
    }
}

exports.getFavArticleByID =  async function (req, res, next) {
    try {
        res.json(await articleService.getFavArticleByID(req.query.list));

    } catch (err) {
        console.error('Error while getting article : ', err.message);
        next(err);
    }
}

exports.getRandomArticles = async function (req, res, next) {
    try {
        res.json(await articleService.getRandomArticles());
    } catch (err) {
        console.error('Error while getting articles : ', err.message);
        next(err);
    }
}