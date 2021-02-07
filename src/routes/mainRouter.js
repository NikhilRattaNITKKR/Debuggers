const express = require('express');

const userControllers = require("../controllers/user")

const router=new express.Router();       //creates a new router object basically it contains all the functions we need like get,post,delete.patchs


router.route('/').get(userControllers.getHome);
router.route('/SignUp').get(userControllers.getSignUp).post(userControllers.signUp);
router.route('/logIn').get(userControllers.getLogIn).post(userControllers.logIn);


router.get("/form",async (req,res)=>{
  res.render("form");
});

router.get("/profile",async (req,res)=>{
  res.render("profile");
});

<<<<<<< HEAD
router.get("/events",async (req,res)=>{
  res.render("events");
});

router.post("/SignUp",signUp)

router.post("/logIn",logIn)
=======
>>>>>>> 49992434cd1d93a83001beba6a4c9d311c4a8034

module.exports=router;
