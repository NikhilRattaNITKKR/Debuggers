const Realm = require("realm");
const BSON = require("bson");
const sharp = require('sharp');
const multer = require('multer');

const app = new Realm.App({ id: "debuggers-lzxyc" });


const editProfileImage = async(req, res) => {

    const mongodb = app.currentUser.mongoClient("mongodb-atlas");
    const Users = mongodb.db("Debuggers").collection('Users');
    // const Events = mongodb.db("Debuggers").collection('Events');


    var imgData = req.file.buffer;


    try {
      let resizedImage = await sharp(imgData).resize(350, 300).png().toBuffer();
      resizedImage = resizedImage.toString('base64');

      const result = await Users.updateOne(
        { _id: new BSON.ObjectID(app.currentUser.id)},
        { $set: {image: resizedImage} }
      );


    } catch(err) {
      console.error("Edit Profile Image: ", err);
    }

    res.redirect(`/profile/${app.currentUser.id}`);


}







module.exports = {
  editProfileImage,
}
