const subscribersModel = require('./../models/subscribe.model')

exports.subscribe = async function (email){
    const checkSubscribe = (email) = await subscribersModel.findOne( {
        email : email,
    }).select({_id:0, email: 1}).catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });

    if (checkSubscribe){
        return {
            "status" : "fail",
            "message" : "Vous êtes déjà abonné à notre newsletter"
        }
    }

    const newSubcriber = await subscribersModel.create({
        email : email,
        subscribed: true
    }).catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });
    if (newSubcriber) {
        return {
            "status" : "fail",
            "message" : "Erreur lors de l'insertion"
        }
    }

    return {
        "status" : "success",
        "data" : newSubcriber
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
