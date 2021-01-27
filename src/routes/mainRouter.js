const express = require('express');

const router=new express.Router();       //creates a new router object basically it contains all the functions we need like get,post,delete.patchs

router.get("/",(req,res)=>{
  res.render("home");
});

router.get("/logIn",(req,res)=>{
  res.render("logIn");
});

router.get("/SignUp",(req,res)=>{
  res.render("SignUp");
});

module.exports=router;
