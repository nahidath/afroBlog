const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

const imagesFilter = (req, file, cb) => {
    console.log('file.mimetype', file.mimetype)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const imagesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/')
    },
    filename: function(req, file, cb){
       cb(null, uuidv4()+'.jpg');
    }
});

const uploadImages = multer({
    storage: imagesStorage,
    fileFilter: imagesFilter
    // limits:{fileSize: 1000000}
});

// Sign up
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/refresh', userController.refresh);
router.get('/logout', userController.logout);
router.post('/updateProfile', uploadImages.single('myImage'), userController.updateProfile);
router.post('/updateFavArticles', userController.updateFavArticles);

module.exports = router;