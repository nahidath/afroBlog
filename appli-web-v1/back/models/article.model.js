const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let articles = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        subCategory: {
            type: String,
            required: true
        },
        urlImage: {
            type: String,
            required: true
        },
        imgDesc: {
            type : String,
            required: true
        },
        commentList: {
            type : Array,
            required: true
        }

    },
    {
        collection: "Articles",
        versionKey: false
    }
);

module.exports = mongoose.model("articles", articles);