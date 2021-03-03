const Realm = require("realm");
const BSON = require("bson");
const sharp = require('sharp');
const multer = require('multer');
const {bot, token}= require('./bot.js')
const fs = require('fs')

const app = new Realm.App({ id: "debuggers-lzxyc" });

function getMongo() {
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const Users = mongodb.db("Debuggers").collection('Users');
  const Events = mongodb.db("Debuggers").collection('Events');

  return {users: Users, events: Events}
}


const editProfileImage = async(req, res) => {

  const Users = getMongo().users;

  var imgData = req.file.buffer;

  try {
    let resizedImage = await sharp(imgData).resize(289, 347).png().toBuffer();
    resizedImage = resizedImage.toString('base64');



    // const result = await Users.updateOne(
    //   { _id: new BSON.ObjectID(app.currentUser.id)},
    //   { $set: {image: resizedImage} }
    // );


  } catch(err) {
    console.error("Edit Profile Image: ", err);
  }

  res.redirect(`/profile/${app.currentUser.id}`);


}

const createPost = async(req, res) => {
  const mongo = getMongo();
  const Users = mongo.users;
  const Events = mongo.events;



  try {


    if (req.file) {
      var imgData = req.file.buffer;
      var image = await sharp(imgData).resize(250, 300).png().toBuffer();
      image = image.toString('base64');
    }

    if(req.cookies.uid) {
      const result = await Events.insertOne({
        _id: new BSON.ObjectID,
        uid: new BSON.ObjectID(app.currentUser.id),
        title: req.body.title,
        desc: req.body.desc,
        genre: req.body.genre,
        image: image||null,
        buttonName: req.body.buttonName||null,
        url: req.body.url||null,
      });

      console.log("Custom: ", req.body.custom);
      console.log("Result: ", result);

    }
  } catch (err) {
    console.error("Create Post Error: ", err);
  } finally {
    res.redirect(`/profile/${app.currentUser.id}`);
  }


}







module.exports = {
  editProfileImage,
  createPost,
}
