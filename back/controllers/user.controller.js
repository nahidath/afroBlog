const userService = require('../services/user.service');
const subscribeService = require('../services/subscribe.service');

exports.signup = async function (req, res, next) {
    try {
        res.json(await userService.signup(req.body.data));
    } catch (err) {
        console.error('Error while sign up', err.message);
        next(err);
    }
}

exports.signin = async function (req, res, next) {
    try {
        // Get user informations
        let login = await userService.signin(req.body);
        if (login.status === "fail") {
            res.json(login);
        }

        // Check subscription
        let checkSubscribe = await subscribeService.checkSubscribed(req.body.email);
        if (checkSubscribe.status === "fail") {
            res.json(checkSubscribe);
        }
        
        // Return cookie and informations
        let userInfos = {...login.data.informations, isSubscribe: checkSubscribe.data};
        let token = login.data.token;
        res
            .cookie("token", token, { 
                sameSite: 'strict',
                path: '/',
                httpOnly: true,
                signed: true
            })
            .json({
                "status" : "success",
                "data" : userInfos
            });
    } catch (err) {
        console.error('Error while sign in', err.message);
        next(err);
    }
}

exports.refresh = async function (req, res, next) {
    try{
        // Get user informations
        let refreshProfile = await userService.refresh(req.email);
        if (refreshProfile.status === "fail") {
            res.json(refreshProfile);
        }

        // Check subscription
        let checkSubscribe = await subscribeService.checkSubscribed(req.email);
        if (checkSubscribe.status === "fail") {
            res.json(checkSubscribe);
        }

        // Return informations
        let userInfos = {...refreshProfile.data, isSubscribe: checkSubscribe.data};
        console.log(userInfos)
        res.json({
            "status" : "success",
            "data" : userInfos
        });
    } catch (err) {
        console.error('Error while refresh :', err.message);
        next(err);
    }
}

exports.logout = async function (req, res, next) {
    try{
        res
            .clearCookie("token")
            .json({
                "status" : "success",
                "data" : "Logout succeed"
            });
    } catch (err) {
        console.error('Error while logout :', err.message);
        next(err);
    }
}

exports.updateProfile = async function (req, res, next) {
    try {
        // Update profile
        let updateProfile = await userService.updateProfile(req.email, req.body.data);
        if (updateProfile.status === "fail") {
            res.json(updateProfile);
        }

        // Update subscription
        let updateSubscribe;
        if (req.body.data.isSubscribe) {
            updateSubscribe = await subscribeService.subscribe(req.email);
        } else {
            updateSubscribe = await subscribeService.unsubscribe(req.email);
        }
        if (updateSubscribe.status === "fail") {
            res.json(updateSubscribe);
        }

        res.json({
            "status" : "success",
            "data" : "Update succeed"
        });
    } catch (err) {
        console.error('Error while updateProfile :', err.message);
        next(err);
    }
}

exports.updateFavArticles = async function (req, res, next) {
    try {
        res.json(await userService.updateFavArticles(req.email, req.body.action, req.body.articleID));
    } catch (err) {
        console.error('Error while updateFavArticles :', err.message);
        next(err);
    }
}