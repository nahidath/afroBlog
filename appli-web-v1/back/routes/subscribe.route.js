const express = require('express');
const router = express.Router();

const subscribeController = require('../controllers/subscribe.controller');

//subscribe
router.post("/subscribe", subscribeController.subscribe);
//unsubscribe
router.post("/unsubscribe", subscribeController.updateSubscription);

module.exports = router;