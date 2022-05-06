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