const express = require('express');

const { logIn,signUp }= require("../controllers/user")

const router=new express.Router();       //creates a new router object basically it contains all the functions we need like get,post,delete.patchs

router.get("/",async (req,res)=>{
  res.render("home");
});

router.get("/logIn",async (req,res)=>{
  res.render("logIn");
});

router.get("/SignUp",async (req,res)=>{
  res.render("SignUp");
});

router.get("/form",async (req,res)=>{
  res.render("form");
});

router.get("/profile",async (req,res)=>{
  res.render("profile");
});

router.post("/SignUp",signUp)

router.post("/logIn",logIn)

module.exports=router;
