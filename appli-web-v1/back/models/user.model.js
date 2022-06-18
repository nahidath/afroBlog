const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let user = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        // username: {
        //     type: String,
        //     required: true
        // },
        password: {
            type: String,
            required: true
        },
        favArtList: {
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