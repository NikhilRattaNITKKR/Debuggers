const express = require('express');

const userControllers = require("../controllers/user")

const router=new express.Router();       //creates a new router object basically it contains all the functions we need like get,post,delete.patchs


router.route('/').get(userControllers.getHome);

router.route('/SignUp').get(userControllers.getSignUp).post(userControllers.signUp);
router.route('/form').post(userControllers.form);


router.route('/logIn').get(userControllers.getLogIn).post(userControllers.logIn);
router.route('/logOut').get(userControllers.logOut);


router.route('/profile').get(userControllers.getProfile);
router.route('/upVote').get(userControllers.upVote);

router.route('/events').get(userControllers.getEvents);




module.exports=router;
