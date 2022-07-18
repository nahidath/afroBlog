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
        res.json(await userService.signin(req.body.data));
    } catch (err) {
        console.error('Error while sign in', err.message);
        next(err);
    }
}

exports.getUserInfos = async function (req, res, next) {
    try{
        res.json(await userService.getUserInfos(req.query.email));
    } catch (err) {
        console.error('Error while getUserInfos :', err.message);
        next(err);
    }
}

exports.updateUserProfile = async function (req, res, next) {
    try {
        res.json(await userService.updateUserProfile(req.query.email));
    } catch (err) {
        console.error('Error while updateUserProfile :', err.message);
        next(err);
    }
}