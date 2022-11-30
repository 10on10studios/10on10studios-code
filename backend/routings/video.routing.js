// const { Router } = require('express')
const express = require('express')
const videoController = require('../controller/videoUpload.controller')
const category = require('../controller/videoUpload.controller')
const multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

const router = express.Router()


// router.route('/signup').get(loginSignupController.page);
router.route('/upload').post(upload.single('video'),videoController.videoUpload);
router.route('/thumbnailupload').post(upload.single('thumbnail'),videoController.videothumbnailUpload);
router.route('/categories').post(upload.single('category_img'),category.categories)
router.route('/fetchAllcategories').get(category.fetchAllcategories)
router.route('/fetchSinglecategories/:uuid').get(category.fetchsinglecategory)
router.route('/fetchSinglevideo/:uuid').get(category.fetchsinglevideo)
router.route('/fetchAllvideo').get(category.fetchAllvideo)








module.exports =router