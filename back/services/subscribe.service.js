const subscribersModel = require('./../models/subscribe.model')

exports.subscribe = async function (email){
    const checkSubscribe = await subscribersModel.findOne( {
        email : email.email,
    }).select({_id:0, email: 1}).catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });

    if (checkSubscribe){
        return {
            "status" : "infofail",
            "message" : "Vous êtes déjà abonné à notre newsletter"
        }
    }

    const newSubscriber = await subscribersModel.create({
        email : email.email,
        subscribed: 1
    }).catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });
    if (!newSubscriber) {
        return {
            "status" : "fail",
            "message" : "Erreur lors de l'insertion"
        }
    }

    return {
        "status" : "success",
        "data" : newSubscriber,
        "message" : "Félicitations ! Vous êtes à present abonné à notre newsletter"
    }
}


exports.updateSubscription = async function (email) {
    const unSubscriber = await subscribersModel.deleteMany(
        { email: email }
    ).catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });

    if(unSubscriber) {
        return {
            "status" : "success",
            "message" : "Vous êtes à présent désabonné"
        }
    }

}

exports.checkSubscribed = async function (email) {
    const check = await subscribersModel.findOne( {
        email : email.email,
    }).select({_id:0, email: 1}).catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });

    if (check){
        return {
            "status" : "success",
            "message" : "true"
        }
    }
}
