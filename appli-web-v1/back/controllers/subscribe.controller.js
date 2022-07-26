const subscribeService = require('../services/subscribe.service');

exports.subscribe = async function (req, res, next) {
    try {
        res.json(await subscribeService.subscribe(req.body.data));
    } catch (err) {
        console.error('Error while subscribe:', err.message);
        next(err);
    }
}

exports.updateSubscription = async function (req, res, next) {
    try {
        res.json(await subscribeService.updateSubscription(req.body.data));
    } catch (err) {
        console.error('Error while unsubscribe:', err.message);
        next(err);
    }
}