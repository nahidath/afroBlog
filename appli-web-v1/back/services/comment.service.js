const commentModel = require('./../models/comment.model')

exports.addComment = async function (comment){
    console.log(comment)
    const newComment = (comment) =   await commentModel.create({
        author: comment.author, commentDesc: comment.desc, articleID : comment.articleID
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