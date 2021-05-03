const Realm = require("realm");
const BSON = require("bson");
const sharp = require('sharp');
const fs = require('fs')
const path = require('path');
const {drive} = require('../services/googleapis');




// const app = new Realm.App({ id: "debuggers-lzxyc" });

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}










const editProfileImage = async(req, res) => {

  const Users = req.app.get('Users')
  var imgData = req.file.buffer;
  const user = JSON.parse(localStorage.getItem('user'));
  try {

    let files = await drive.files.list({
      q: `name = '${user._id.toString()}'`
    });

    files = files.data.files
    // if(files.length>0) {
    //   let result = await drive.files.delete({
    //     fileId: files[0].id
    //   });//Delete Iamge File If Already Exists
      // console.log("Delete Result", result.data);
    // } // Check File Name



    let resizedImage = await sharp(imgData).resize(289, 347).png().toBuffer();
    resizedImage = resizedImage.toString('base64');
    resizedImage = new Buffer.from(resizedImage, 'base64');
    fs.writeFileSync('src/controllers/image.png', resizedImage);//Created Temp Image File In Controllers Directory


    const filePath = path.join(__dirname, 'image.png');
    const response = await drive.files.create({
      requestBody: {
        name: user._id.toString(),
        mimeType: 'image/png'
      },
      media: {
        mimeType: 'image/png',
        body: fs.createReadStream(filePath)
      }
    }); // To Upload New Image File

    console.log(response.data);

    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    }); //Change File Permissions to Public

    await Users.updateOne({
      _id: new BSON.ObjectId(req.cookies.uid.toString())
    }, {
      $set: {
        image: response.data.id
      }
    }); // Uploading URL TO Mongo


  } catch(err) {
    console.error("Edit Profile Image: ", err);
  } finally {
    res.redirect(`/profile/${req.cookies.uid}`);
  }
}

const createPost = async(req, res) => {
  const Users = req.app.get('Users');
  const Events = req.app.get('Events');
  let user = JSON.parse(localStorage.getItem('user'));
  let id = new BSON.ObjectId();
  let image = '';


  try {


    if (req.file) {
      var imgData = req.file.buffer;
      image = await sharp(imgData).resize(450, 250).png().toBuffer();
      image = image.toString('base64');
      image = new Buffer.from(image, 'base64');
      fs.writeFileSync('src/controllers/image.png', image);


      const filePath = path.join(__dirname, 'image.png');
      const response = await drive.files.create({
        requestBody: {
          name: id.toString(),
          mimeType: 'image/png'
        },
        media: {
          mimeType: 'image/png',
          body: fs.createReadStream(filePath)
        }
      }); // Create New Image File

      await drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      }); //Change File Permissions to Public

      image = response.data.id;
    }

    if(req.cookies.uid) {
      const result = await Events.insertOne({
        _id: id,
        uid: new BSON.ObjectId(user._id.toString()),
        title: req.body.title.trim(),
        desc: req.body.desc.trim(),
        genre: req.body.genre.trim(),
        image: image,
        buttonName: req.body.buttonName||null,
        url: req.body.url||null,
        like: 0
      });

      console.log("Custom: ", req.body.custom);
      console.log("Result: ", result);

    }
  } catch (err) {
    console.error("Create Post Error: ", err);
  } finally {
    // res.redirect(`/profile/${req.cookies.uid.toString()}`);
    res.redirect('/events')
  }


}

const searchUser = async(req, res) => {


  const Users = req.app.get('Users');


  let result = await Users.aggregate([
    {
      "$search": {
        "autocomplete": {
          "query": `${req.query.name}`,
          "path": "name",
          "fuzzy": {
            "maxEdits": 2
          }
        }
      }
    }
  ]).toArray();
  console.log("Result: ", result);




  res.json({result})
}







module.exports = {
  editProfileImage,
  createPost,
  searchUser
}
