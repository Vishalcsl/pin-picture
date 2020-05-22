const postController = require('../controllers/post.controller');
const multer = require('multer');
const path = require("path");


const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


module.exports = function (app) {
    app.post('/api/post',
        upload.single('file'),
        postController.postContent);

    app.post('/api/commentPost/:postId', postController.postComment);

    app.post('/api/updateLike/:postId/:val', postController.postLike)
}