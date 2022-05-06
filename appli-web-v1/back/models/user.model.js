const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let user = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { 
        collection: "Users",
        versionKey: false  
    }
);

module.exports = mongoose.model("user", user);