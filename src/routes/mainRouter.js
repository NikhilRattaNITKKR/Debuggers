const express = require('express');
const multer = require('multer');


var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

const userControllers = require("../controllers/user")
const profileControllers = require("../controllers/profile")
const doubtControllers = require("../controllers/doubt");
const router=new express.Router();       //creates a new router object basically it contains all the functions we need like get,post,delete.patchs


router.route('/').get(userControllers.getHome);

router.route('/SignUp').get(userControllers.getSignUp).post(userControllers.signUp);
router.route('/form').post(userControllers.form);


router.route('/logIn').get(userControllers.getLogIn).post(userControllers.logIn);
router.route('/logOut').get(userControllers.logOut);

router.route('/profile/:id').get(userControllers.getProfile);
router.route('/editImage').post(upload.single('profileImage'), profileControllers.editProfileImage);
router.route('/createPost').post(upload.single('image'), profileControllers.createPost);

router.route('/events').get(userControllers.getEvents);


router.route('/doubtforum').get(doubtControllers.getDoubtForum).post(doubtControllers.createDoubt)



module.exports=router;
