const express = require('express');
const request = require('request');
const path = require('path');
const mainRouter=require('./routes/mainRouter');
const app=express();

const pathName=path.join(__dirname,'/public')        //to register path for public directory

app.set("view engine", "ejs");

const viewsPath = path.join(__dirname, '/views')    //registering path for views
app.set('views', viewsPath)

app.use(express.static(pathName));

app.use(mainRouter);

module.exports=app;
