const userModel = require('../models/user.model');

exports.signup = async function (user) {
    console.log(user)

    // const userInsertion = await userModel.insertOne({ 
    //         username: user.name,
    //         password: password.name
    // })
    // .catch(err => {return json.fail(err)});

    // if (!userInsertion) {
    //     return {
    //         "status" : "fail",
    //         "message" : "Erreur lors de l'insertion"
    //     }
    // }

    // return {
    //     "status" : "success",
    //     "data" : userInsertion
    // }
};