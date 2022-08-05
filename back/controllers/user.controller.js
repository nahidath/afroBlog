const userService = require('../services/user.service');

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
        let login = await userService.signin(req.body);
        if (login["status"] === "success") {
            let token = login["data"]["token"];
            res
                .cookie("token", token, { 
                    sameSite: 'strict',
                    path: '/',
                    httpOnly: true,
                    signed: true
                })
                .json({
                    "status" : "success",
                    "data" : login["data"]["informations"]
                });
        } else {
            res.json(login);
        }
    } catch (err) {
        console.error('Error while sign in', err.message);
        next(err);
    }
}

exports.refresh = async function (req, res, next) {
    try{
        res.json(await userService.refresh(req.email));
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
        res.json(await userService.updateProfile(req.email, req.body.data));
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