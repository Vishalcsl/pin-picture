const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const fs = require('fs');

exports.profile_upload = (req, res, next) => {
    User.findById({ _id: req.body.id })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            } else {
                user.profileImage.data = fs.readFileSync(req.file.path)
                user.profileImage.contentType = 'image/png';
                user.save();

                res.status(200).send({
                    message: "Image stored and retrived success",
                    profileImage: user.profileImage
                });
            }
        })
}

exports.getProfileImage = (req, res) => {
    console.log(req.params.id)
    User.findById({ _id: req.params.id })
        .exec((err, user) => {
            if (err) {
                console.log('Error: ', err)
                res.status(500).send({ message: err })
                return
            } else if (!user) {
                res.status(404).send({ message: "user profile not found" })
            } else if (user) {
                console.log("Image Sent Success")
                res.status(200).send({
                    profileImage: user.profileImage
                })
            }
        })
}