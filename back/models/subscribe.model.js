const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let subscribers = new Schema(
    {
        email: {
            type: String,
            required: true
        }
    },
    {
        collection: "Subscribers",
        versionKey: false
    }
);

module.exports = mongoose.model("subscribers", subscribers);