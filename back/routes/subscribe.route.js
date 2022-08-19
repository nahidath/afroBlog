const express = require('express');
const router = express.Router();

const subscribeController = require('../controllers/subscribe.controller');

//subscribe
router.post("/subscribe", subscribeController.subscribe);
//unsubscribe
router.post("/unsubscribe", subscribeController.unsubscribe);
//check subscriber
router.get("/check", subscribeController.checkSubscribed);

module.exports = router;