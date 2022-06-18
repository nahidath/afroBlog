const articleModel = require('./../models/article.model');

exports.getAllArticle = async function (){
    const allArticles = await articleModel.find();

    if(allArticles){
        return {
            "status" : "success",
            "data" : allArticles
        }
    }
};

exports.getArticleByCategory = async function (category) {
    const articleByCategory = await articleModel.find(
        { category: category }
    )

    if(articleByCategory){
        return {
            "status" : "success",
            "data" : articleByCategory
        }
    }
}

exports.getArticleBySubcategory = async function (category, subcategory) {
    const articleBySubcategory = await articleModel.find(
        {category: category, subCategory: subcategory}
    )

    if(articleBySubcategory){
        return{
            "status" : "success",
            "data" : articleBySubcategory
        }
    }
}
