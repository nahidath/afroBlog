const subscribeService = require('../services/subscribe.service');

exports.subscribe = async function (req, res, next) {
    try {
        res.json(await subscribeService.subscribe(req.body.data.email));
    } catch (err) {
        console.error('Error while subscribe:', err.message);
        next(err);
    }
}

exports.unsubscribe = async function (req, res, next) {
    try {
        res.json(await subscribeService.unsubscribe(req.body.data.email));
    } catch (err) {
        console.error('Error while unsubscribe:', err.message);
        next(err);
    }
}

exports.checkSubscribed = async function (req, res, next) {
    try {
        res.json(await subscribeService.checkSubscribed(req.email));
    } catch (err) {
        console.error('Error while checkSubscribed:', err.message);
        next(err);
    }
}