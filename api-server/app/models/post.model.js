const mongoose = require('mongoose');

const Post = mongoose.model(
    "Post",
    new mongoose.Schema({
        email: String,
        username: String,
        datePosted: String,
        caption: String,
        likes: Number,
        content: {
            data: Buffer, contentType: String
        },
        hashTags: [String],
        comments: [{
            commentedBy: { type: String },
            commentedOn: { type: String },
            comment: { type: String }
        }]
    })
);

module.exports = Post;