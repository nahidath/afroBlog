const userModel = require('./../models/user.model');

exports.signup = async function (user) {
    const checkUserExists = (user) = await userModel.findOne( {
        email : user.email,
    }).select({_id:0, email: 1}).catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });

    if(checkUserExists){
        return {
            "status" : "fail",
            "message" : "Cet utilisateur existe déjà"
        }
    }
    const userInsertion = await userModel.create({
            name: user.name,
            firstName: user.firstName,
            email: user.email,
            // username: user.username,
            password: user.password
    })
    .catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });


    if (!userInsertion) {
        return {
            "status" : "fail",
            "message" : "Erreur lors de l'insertion"
        }
    }

    return {
        "status" : "success",
        "data" : userInsertion
    }
};

exports.signin = async function (user){
    const userFind = await userModel.findOne({
        email: user.email
    })
    .select({
        _id:0,
        password: 1
    })
    .catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });


    if(userFind == null){
        return {
            "status" : "fail",
            "message" : "email incorrect"
        }
    }else if(userFind.password == user.password) {
        return {
            "status" : "success",
            "message" : "password correct"
        }
    }else {
        return {
            "status" : "fail",
            "message" : "password incorrect"
        }
    }



};

exports.getFavArticlesByUser = async function(user){
    const favListArt = await userModel.find({
        email: user.email
    }).select({
        _id:0,
        favListArt: 1
    })
    .catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });

    if(favListArt){
        return {
            "status" : "success",
            "data" : favListArt
        }
    }

};

exports.updateUserProfile = async function (user){
    const updateInfos = await userModel.updateMany(
        { email: user.email},
        { $set: { name: user.name, firstname: user.firstName, password: user.password } }
    ).catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });

    if(updateInfos){
        return {
            "status" : "success",
            "data" : updateInfos
        }
    }
}

exports.getUserInfos = async function (user){
    const infoUser = await userModel.findOne(
        { email : user.email }
    ).catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });

    if(infoUser){
        return {
            "status" : "success",
            "data" : infoUser
        }
    }
}