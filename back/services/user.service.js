const userModel = require('./../models/user.model');
const jwt = require("jsonwebtoken");
const jwtKey = 'moussestlepluscharismatique!!!!';


exports.signup = async function (user) {
    // Get the user from database
    const userFind = (user) = await userModel.findOne( {
        email : user.email,
    })
    .select({
        _id:0, 
        email: 1
    })
    .catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });

    if(userFind){
        return {
            "status" : "fail",
            "message" : "Cet utilisateur existe déjà"
        }
    }

    // Add the user in database
    const userInsertion = await userModel.create({
            name: user.name,
            firstName: user.firstName,
            email: user.email,
            password: user.password,
            favArtList: []
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
    // Get the user from database
    const userFind = await userModel.findOne({
        email: user.email
    })
    .select({
        _id: 0,
        name: 1,
        firstName: 1,
        email: 1,
        password: 1,
        favArtList: 1,
    })
    .catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });

    // Check if the user exists
    if (!userFind){
        return {
            "status" : "fail",
            "message" : "email incorrect"
        }
    }
    
    // Check the password
    if (userFind.password !== user.password) {
        return {
            "status" : "fail",
            "message" : "password incorrect"
        }
    }

    // Create the cookie
    let token = createCookie(user.email);  
    
    // Return informations
    let infos = {
        name        : userFind.name,
        firstName   : userFind.firstName,
        email       : userFind.email,
        favArtList  : userFind.favArtList
    };
    return {
        "status" : "success",
        "message" : "password correct",
        "data": {
            "informations": infos,
            "token": token
        }
    }
};

exports.refresh = async function (userEmail){
    // Get the user from database
    const userFind = await userModel.findOne({
        email: userEmail
    })
    .select({
        _id: 0,
        name: 1,
        firstName: 1,
        email: 1,
        password: 1,
        favArtList: 1,
    })
    .catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });

    if (!userFind) {
        return {
            "status" : "fail",
            "message" : "Utilisateur introuvable"
        }
    }

    // Return informations
    let infos = {
        name        : userFind.name,
        firstName   : userFind.firstName,
        email       : userFind.email,
        favArtList  : userFind.favArtList
    };
    return {
        "status" : "success",
        "data" : infos
    }
}

exports.updateProfile = async function (mail, data, image) {
    let params = {
        name: data.name, 
        firstName: data.firstName, 
        password: data.password,
        image: image
    };
    
    console.log(params)

    // Remove fields who are undefined or null
    for (let prop in params){ 
        if(!params[prop]){
            delete params[prop];
        }
    }

    console.log(params)

    // Update user informations
    // const updateInfos = await userModel.updateOne(
    //     { email: mail},
    //     { $set: params }
    // ).catch(err => {
    //     return {
    //         "status" : "fail",
    //         "message" : err
    //     }
    // });

    if (!updateInfos) {
        return {
            "status" : "fail",
            "message" : "La mise à jour du profile a échoué"
        }
    }

    return {
        "status" : "success",
        "data" : "La mise à jour du profile a réussie"
    }
}

exports.updateFavArticles = async function (mail, action, articleId){
    let actions = {
        "add": "$addToSet",
        "delete": "$pull"
    }
    let mongoAction = {};
    mongoAction[actions[action]] = { favArtList: articleId };
    console.log(mongoAction)

    const updateFavorite = await userModel.updateOne({ "email": mail }, mongoAction )
    .catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });
    
    if (!updateFavorite) {
        return {
            "status" : "fail",
            "message" : "Erreur lors de la mise à jour des favoris"
        }
    }

    return {
        "status" : "success",
        "data" : ""
    }
}



function createCookie (pEmail) {
    let profile = {
        email: pEmail
    };
    const token = jwt.sign({ profile }, jwtKey, {
        algorithm: "HS256"
    });
    return token;
}

