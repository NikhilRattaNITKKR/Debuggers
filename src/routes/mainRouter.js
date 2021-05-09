const express = require('express');
const multer = require('multer');


var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

const userControllers = require("../controllers/user")
const profileControllers = require("../controllers/profile")
const doubtControllers = require("../controllers/doubt");
const eventControllers = require("../controllers/event");
const router=new express.Router();       //creates a new router object basically it contains all the functions we need like get,post,delete.patchs
const gossipController = require("../controllers/gossip");

router.route('/').get(userControllers.getHome);

router.route('/SignUp').get(userControllers.getSignUp).post(userControllers.signUp);
router.route('/form').post(userControllers.form);


router.route('/logIn').get(userControllers.getLogIn).post(userControllers.logIn);
router.route('/logOut').get(userControllers.logOut);

router.route('/profile/:id').get(userControllers.getProfile);
router.route('/editImage').post(upload.single('profileImage'), profileControllers.editProfileImage);
router.route('/createPost').post(upload.single('image'), profileControllers.createPost);
router.route('/profile/:id/search').get(profileControllers.searchUser);

router.route('/events').get(eventControllers.getEvents);
router.route('/events/get/:id').get(eventControllers.getSpecificEvent)
router.route('/events/search').get(eventControllers.searchEvent);
router.route('/events/:id/takeAction').get(eventControllers.takeAction);
router.route('/events/:id/undoAction').get(eventControllers.undoAction);



router.route('/doubtforum').get(doubtControllers.getDoubtForum).post(doubtControllers.createDoubt)
router.route('/doubtforum/:id').get(doubtControllers.getSpecificDoubt).post(doubtControllers.createAnswer);
router.route('/doubtforum/createComment/:id/:aid').post(doubtControllers.createComment);
router.route('/doubtforum/updateDoubt/:id').get(doubtControllers.updateDoubt).post(doubtControllers.editDoubt);
router.route('/doubtforum/:id/:aid/updateAnswer').get(doubtControllers.updateAnswer);


router.route('/post').get(function(req,res){
  res.render('post');
});



router.get("/gossip" ,function(req,res){
    res.render("gossip");
});




//router.route('/comments/:id').get(userControllers.getComments);
//router.route('/upVote/:id').get(userControllers.upVote);
//router.route('/downVote/:id').get(userControllers.downVote);



module.exports=router;
