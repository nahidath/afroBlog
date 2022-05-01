const userModel = require('./../models/user.model');

exports.signup = async function (user) {

    const userInsertion = await userModel.create({ 
            email: user.email,
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