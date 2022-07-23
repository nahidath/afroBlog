const commentModel = require('./../models/comment.model')
const articleModel = require("./../models/article.model");

exports.addComment = async function (comment){
    const newComment = (comment) =   await commentModel.create({
        author: comment.author, commentDesc: comment.commentDesc, articleID : comment.articleID, date : comment.date
    }).catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });


    if (!newComment) {
        return {
            "status" : "fail",
            "message" : "Erreur lors de l'insertion"
        }
    }

    return {
        "status" : "success",
        "data" : newComment
    }

}

exports.getCommentsArticle = async function (article_ID){
    const commentArt = await commentModel.find(
        {articleID : article_ID}
    ).sort({date : -1});
    if(commentArt){
        return{
            "status" : "success",
            "data" : commentArt
        }
    }
}