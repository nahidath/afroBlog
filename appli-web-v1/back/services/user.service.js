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