const express = require('express');

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

router.post("/SignUp",async (req,res)=>{


if(!req.body.email||!req.body.college||!req.body.password||!req.body.confirm){
  throw new Error("All fields must be filled");
}

if(req.body.password!==req.body.confirm){
  throw new Error("Passwords do not match");
}

let credentials={
  email:req.body.email+req.body.college,
  password:req.body.password,
}

console.log(credentials);

//send an email with confirmation

res.render("form");

})
module.exports=router;
