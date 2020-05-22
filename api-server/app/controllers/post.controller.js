const db = require("../models");
const Post = db.post;
const fs = require('fs');

exports.postContent = (req, res, next) => {
    var tags = req.body.hashTags.split(',');
    const post = new Post({
        email: req.body.email,
        username: req.body.username,
        caption: req.body.caption,
        hashTags: tags,
        datePosted: req.body.datePosted,
        content: {
            data: fs.readFileSync(req.file.path),
            contentType: 'image/png'
        }
    })


    post.save((err, post) => {
        if (err) {
            res.status(500).send({
                message: "Server Error While Posting",
                err: err
            })
        } else if (post) {
            res.status(200).send({ message: "Post Success" })
        }
    })
}


exports.postComment = function (req, res) {
    Post.findById({ _id: req.params.postId }, function (err, post) {
        if (err) {
            res.status(500).send({ message: "Error Posting Comment" })
        } else if (!post) {
            res.status(404).send({ message: "Post Not Found" })
        } else if (post) {
            var singleComment = {
                "commentedBy": req.body.commentedBy,
                "commentedOn": req.body.commentedOn,
                "comment": req.body.comment
            }
            post.comments.push(singleComment);
            post.save();
            res.status(200).send({ message: "Comment Posted Successfully" });
        }
    })
}

exports.postLike = function (req, res) {
    Post.findById({ _id: req.params.postId }, function (err, post) {
        if (err) {
            res.status(500).send({ message: "Some Server Error" })
        } if (!post) {
            res.status(404).send({ message: "Oops!! post not found" })
        } else if (post) {

            var inrDcr = parseInt(req.params.val);
            if (inrDcr === -1 && post.likes > 0) {
                post.likes = post.likes + inrDcr;
            }
            else if (inrDcr === 1 && post.likes === undefined) {
                post.likes = 1;
            } else if (inrDcr === 1 && post.likes >= 0) {
                post.likes = post.likes + inrDcr;
            } else if (inrDcr === -1 && post.likes === undefined) {
                post.likes = 0;
            }

            post.save();
            res.status(200).send({ likes: post.likes })
        }
    })
}