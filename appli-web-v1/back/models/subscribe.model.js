const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let subscribers = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        subscribed: {
            type: Boolean,
            required: true
        }

    }
);

module.exports = mongoose.model("subscribers", subscribers);