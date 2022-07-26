const articleModel = require('./../models/article.model');

exports.getAllArticle = async function (){
    // const allArticles = await articleModel.find().select({ _id: 0, title: 1, category: 1});
    const allArticles = await articleModel.find().sort({date : -1});

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

exports.getArticleByID = async function (id){
    const oneArticle = await articleModel.findOne(
        {_id : id}
    )
    if(oneArticle){
        return{
            "status" : "success",
            "data" : oneArticle
        }
    }
}

exports.getFavArticleByID = async function (listID){
    console.log("liste id", listID);
    const favArticles = await articleModel.find(
        {_id: { $in: listID } }
    )

    if(favArticles){
        return{
            "status" : "success",
            "data" : favArticles
        }
    }
}

exports.getRandomArticles = async function(){
    const randomArt = await articleModel.aggregate(
        [ { $sample: { size: 3 } } ]
    )
    if(randomArt){
        return{
            "status" : "success",
            "data" : randomArt
        }
    }
}

exports.searchArticles = async function(searchText){
    const search =  await articleModel.find( { title: { $regex: searchText, $options:'i'} } )
    if(search){
        return{
            "status" : "success",
            "data" : search
        }
    }
}