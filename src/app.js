const express = require('express');
const request = require('request');
const path = require('path');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const mainRouter=require('./routes/mainRouter');
const app=express();

const pathName=path.join(__dirname,'/public')        //to register path for public directory

app.set("view engine", "ejs");

const viewsPath = path.join(__dirname, '/views')    //registering path for views
app.set('views', viewsPath)

app.use(express.static(pathName));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser());

app.use(mainRouter);

module.exports=app;
