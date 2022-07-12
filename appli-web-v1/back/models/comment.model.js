const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId


let comments = new Schema(
    {
        commentDesc: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        articleID : {
            type: ObjectId,
            ref: 'articles'
        }

    },
    {
        collection: "Comments",
        versionKey: false
    }
);

module.exports = mongoose.model("comments", comments);