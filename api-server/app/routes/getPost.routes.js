const getPostController = require("../controllers/getPost.controller");

module.exports = function (app) {
    app.get("/api/getpost/:username",
        getPostController.getIndividualPosts);

    app.get("/api/getAllpost", getPostController.getAllPosts)

    app.get("/api/getSinglePost/:ImgId", getPostController.getSinglePost)

    app.post("/api/similartags", getPostController.getSimilarHashPost)

    app.get("/api/profile/:username", getPostController.getUserProfile)

    app.post("/api/followerUpdate/:username/:action", getPostController.updateFollower)
}