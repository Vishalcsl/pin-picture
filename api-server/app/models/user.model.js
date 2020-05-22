const mongoose = require('mongoose');

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        mobile: Number,
        followers: [String],
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        profileImage:
            { data: Buffer, contentType: String }
    })
);

module.exports = User;