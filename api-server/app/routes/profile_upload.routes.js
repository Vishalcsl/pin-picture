const uploadController = require("../controllers/upload.controller");
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
    app.post("/api/profile_image/upload",
        upload.single('myImage'),
        uploadController.profile_upload);

    app.post("/api/myImage/:id", uploadController.getProfileImage)
}
