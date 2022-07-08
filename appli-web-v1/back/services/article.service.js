const articleModel = require('./../models/article.model');

exports.getAllArticle = async function (){
    // const allArticles = await articleModel.find().select({ _id: 0, title: 1, category: 1});
    const allArticles = await articleModel.find().sort({date : -1});

    console.log(allArticles);
    if(allArticles){
        return {
            "status" : "success",
            "data" : allArticles
        }
    }
};

exports.getArticleByCategory = async function (category) {
    // const articleByCategory = await articleModel.find(
    //     { category: category }
    // )
    //
    // if(articleByCategory){
    //     return {
    //         "status" : "success",
    //         "data" : articleByCategory
    //     }
    // }
    console.log("ok")
}

exports.getArticleBySubcategory = async function (category, subcategory) {

    let match = {}

    if (subcategory == "all"){
        match = {category: category}
    }else{
        match = {category: category, subCategory: subcategory}
    }
    const articleBySubcategory = await articleModel.find(match)

    if(articleBySubcategory){
        return{
            "status" : "success",
            "data" : articleBySubcategory
        }
    }
}

// exports.getArticleContent = async function (article){
//     const oneArticle = await articleModel.findOne(
//         {id}
//     )
// }
