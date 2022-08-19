const subscribersModel = require('./../models/subscribe.model')

exports.subscribe = async function (email) {
    const checkSubscribe = await subscribersModel.findOne( {
        email : email,
    }).select({_id:0, email: 1}).catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });

    if (checkSubscribe){
        return {
            "status" : "success",
            "message" : "Vous êtes déjà abonné à notre newsletter"
        }
    }

    const newSubscriber = await subscribersModel.create({
        email : email
    }).catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });
    if (!newSubscriber) {
        return {
            "status" : "fail",
            "message" : "Erreur lors de la désinscription"
        }
    }

    return {
        "status" : "success",
        "data" : newSubscriber,
        "message" : "Félicitations ! Vous êtes à present abonné à notre newsletter"
    }
}


exports.unsubscribe = async function (email) {
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
        email : email,
    }).select({
        _id:0, 
        email: 1
    }).catch(err => {
        return {
            "status" : "fail",
            "message" : err
        }
    });

    return {
        "status" : "success",
        "data" : check ? true : false
    }
}


    // const sendEmail = (sub) => {
    //     if(sub == "subscribe"){
    //         emailjs.send('service_ck55iw9', 'template_k4xib47', {email:currentUser.email, subject:"Bienvenue sur notre newsletter !!", message:"\n" +
    //                 "BIENVENUE CHEZ AFROBLOG !\n" +
    //                 "\n" +
    //                 "MERCI DE T'ÊTRE ABONNÉ(E) À LA NEWSLETTER D' AFROBLOG. DÈS AUJOURD'HUI, TU RECEVRAS PAR MAIL DES INFORMATIONS SUR LES TENDANCES, LA MODE ET LES NOUVEAUTÉS D' AFROBLOG. TU SERAS INFORMÉ(E) À TOUT MOMENT !\n" +
    //                 "\n" +
    //                 "À BIENTÔT ET PROFITE BIEN DE NOTRE BLOG !\n" +
    //                 "\n" +
    //                 "www.afroblog.com"},'4efi92eRP81rtkqUk')
    //             .then(function(response) {
    //                 console.log('SUCCESS!', response.status, response.text);
    //             }, function(error) {
    //                 console.log('FAILED...', error);
    //             });

    //     }else{
    //         emailjs.send('service_ck55iw9', 'template_k4xib47', {email:currentUser.email, subject: "Oh non vous partez !", message:"Oh non, vous vous êtes désabonné de la newsletter!\nMais c'est pas grave tu continueras à avoir accès à tous les articles du blog.\n\nA très vite !!!\n\n\nwww.afroblog.com"},'4efi92eRP81rtkqUk')
    //             .then(function(response) {
    //                 console.log('SUCCESS!', response.status, response.text);
    //             }, function(error) {
    //                 console.log('FAILED...', error);
    //             });
    //     }
    // }
