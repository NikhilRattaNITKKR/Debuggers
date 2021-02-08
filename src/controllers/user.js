const Realm = require("realm");
const BSON = require("bson");

const app = new Realm.App({ id: "debuggers-lzxyc" });
if (app.currentUser !== null) {
  console.log("User: ", app.currentUser);
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const Users = mongodb.db("Debuggers").collection("Users");
}



const getHome = async(req, res) => {
  console.log("Get Home:", app.currentUser);
  try {
    if (app.currentUser != null) {
      res.redirect('/profile');
    } else {
      if (req.query.tokenId == null) {
        res.render('home')

      } else {
        const token = req.query.token;
        const tokenId = req.query.tokenId;

        console.log('Token Id: ', tokenId);
        await app.emailPasswordAuth.confirmUser(token, tokenId);
        res.render('form', {title: 'Detail Form'});
      }
    }
  } catch (e) {
    console.error("Get Home Error: ", e);
  } finally{
    console.log("Get Home 2: ", app.currentUser);

  }

}


const getSignUp = function(req, res) {
  if (app.currentUser == null) {
    res.render('signup');
  } else {
    res.redirect('/profile');
  }
}
const signUp = async(req,res)=>{
  try {
    if(!req.body.email||!req.body.college||!req.body.password||!req.body.confirm){
      throw new Error("All fields must be filled");
    } else if(req.body.password!==req.body.confirm){
      throw new Error("Passwords do not match");
    } else {
      const email = req.body.email+req.body.college;
      const password = req.body.password;
      await app.emailPasswordAuth.registerUser(email, password);
      res.send({Message: "Check Your Email for Confirmation"})

    }

  } catch (e) {
    console.error("SignUp Error: ", e);
  }
}

const form = async({body, params}, res)=>{
  try {
    const credentials = Realm.Credentials.emailPassword(
      body.email,
      body.password
    );
    const user = await app.logIn(credentials);
    console.log("Form: ",user.id);
    console.log("Form 2: ", app.currentUser.id);
    const mongoUser = user.mongoClient("mongodb-atlas");
    const collection = mongoUser.db("Debuggers").collection("Users");


    const result = await collection.insertOne({
      _id: user.id,
      name: body.name,
      branch: body.branch,
      genre: body.genre,
      rollNo:body.rollNo,
      email: body.email,
      gender: body.gender
    })

    console.log("Form: ", result);

    res.redirect('/profile')


  } catch (e) {
    console.error("Form Error: ", e);
  }

}


const getLogIn = async(req, res) => {
  if (app.currentUser == null) {
    res.render('login');
  } else {
    res.redirect('/profile');
  }
}
const logIn = async(req, res) => {

  try {
    if (!req.body.email||!req.body.college||!req.body.password) {
      throw new Error("All fields are necessary!")
    } else {
      const credentials = Realm.Credentials.emailPassword(
        req.body.email + req.body.college,
        req.body.password
      );
      const user = await app.logIn(credentials);
      console.log("Successfully logged in!", user.id);
      res.redirect('/profile');
    }

  } catch (e) {
    console.error("Failed to log in", e);
  }
}
const logOut = async(req, res) => {
  try {
    await app.allUsers[app.currentUser.id].logOut();
    res.redirect('/')
  } catch (e) {
    console.error('Log Out Error: ', e);
  }

}

const getProfile = async(req, res) => {

  try {
    if (app.currentUser == null) {
      res.redirect('/');
    } else {

      const mongodbRealm = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodbRealm.db("Debuggers").collection("Users");
      const user = await collection.findOne({_id: app.currentUser.id});
      console.log("Profile:", user);
      if (user == null) {
        await app.allUsers[app.currentUser.id].logOut();
        res.render('form', {title: "Detail Form"});
      } else {
        res.render('profile');
      }
    }
  } catch (e) {
    console.error("Get Profile Error: ", e);
  }
}



module.exports={
  getHome,
  getSignUp,
  signUp,
  form,
  getLogIn,
  logIn,
  logOut,
  getProfile
}
