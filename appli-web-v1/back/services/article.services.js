const articleModel = require('./../models/article.model');
const userModel = require("./../models/user.model");

exports.getAllArticle = async function (){
    const allArticles = await articleModel.find();
}
