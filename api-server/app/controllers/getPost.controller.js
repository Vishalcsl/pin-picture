const db = require("../models");
const Post = db.post;
const User = db.user;

exports.getIndividualPosts = function (req, res) {
    Post.find({ username: req.params.username })
        .exec((err, data) => {
            if (err) {
                res.status(500).send({ error: err })
            } else if (!data) {
                res.status(404).send({ error: "No data found" })
            } else {
                res.status(200).send({ data: data })
            }
        })
}


exports.getAllPosts = function (req, res) {
    Post.find({}, function (err, data) {
        if (err) {
            res.status(500).send({ error: err })
        } else if (!data) {
            res.status(404).send({ error: "Error in fetching all posts" })
        } else {
            res.status(200).send({ data: data })
        }
    })
}

exports.getSimilarHashPost = function (req, res) {
    var tagsTofind = req.body.tags;
    console.log(tagsTofind)
    Post.find({}, function (err, data) {
        if (err) {
            res.status(500).send({ error: err })
        } else if (!data) {
            res.status(404).send({ message: "No record found in database" })
        } else {
            var toSend = [];

            data.map((post) => {
                var check = false;
                for (var i = 0; i < tagsTofind.length; i++) {
                    if (post.hashTags !== undefined || post.hashTags !== null) {
                        for (var j = 0; j < post.hashTags.length; j++) {
                            if (post.hashTags[j].toLowerCase() === tagsTofind[i].toLowerCase()) {
                                toSend.push(post);
                                check = true;
                                break
                            }
                        }
                    } else {
                        break;
                    }
                    if (check === true) {
                        break;
                    }
                }
            })

            res.status(200).send({ data: toSend })
        }
    })
}

exports.getSinglePost = function (req, res) {
    Post.findById({ _id: req.params.ImgId }, function (err, data) {
        if (err) {
            res.status(500).send({ error: err })
        } else if (!data) {
            res.status(404).send({ error: "Post not found" })
        } else {
            res.status(200).send({ data: data })
        }
    })
}

exports.getUserProfile = function (req, res) {
    var username = req.params.username;
    User.find({ username: username }, function (err, data) {
        if (err) {
            res.status(500).send({ message: "Internal Server Error" })
        } else if (!data) {
            res.status(404).send({ message: "User Not Found" })
        } else {
            res.status(200).send({ data })
        }
    })

}


exports.updateFollower = function (req, res) {
    var username = req.params.username;
    var action = req.params.action;

    User.find({ username: username }, function (err, data) {
        if (err) {
            res.status(500).send({ message: "Internal Server Error" })
        } else if (!data) {
            res.status(404).send({ message: "User Not Found" })
        } else {
            var followerEmail = req.body.email;

            if (data[0].followers !== undefined) {
                if (action === 'add') {
                    var checkIndex = data[0].followers.indexOf(followerEmail);
                    if (checkIndex === -1) {
                        data[0].followers.push(followerEmail);
                        data[0].save();
                    }
                    res.status(200).send({ data: data[0].followers })
                    return
                } else if (action === 'remove') {
                    var indexToRemove = data[0].followers.indexOf(followerEmail);
                    if (indexToRemove > -1) {
                        data[0].followers.splice(indexToRemove, 1);
                    } else {
                        data[0].followers.push(followerEmail)
                    }
                    data[0].save();
                    res.status(200).send({ data: data[0].followers })
                    return
                }
            }
            else {
                res.status(500).send({ message: "Intentional Error" })
            }
        }
    })
}