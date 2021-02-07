const Realm = require("realm");
const BSON = require("bson");

const app = new Realm.App({ id: "debuggers-lzxyc" });
if (app.currentUser !== null) {
  // console.log(app.currentUser);
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const users = mongodb.db("Debuggers").collection("Users");
}



const getHome = async(req, res) => {
  if (app.currentUser == null) {
    res.render('home');
  } else {
    res.redirect('/profile')
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
      const result = await app.emailPasswordAuth.registerUser(email, password);
    }

  } catch (e) {
    console.error("SignUp Error: ", e);
  }
}

const getForm = async (req,res)=>{
  if (req.params.value === "true") {
    res.render("form");
    console.log(token);
    console.log(tokenId);
  } else {
    res.send({Error: "error"})
  }
}
const form = async({body, params}, res)=>{
  const token = params.token;
  const tokenId = params.tokenId;



  const result = await users.insertOne({
    name: body.name,
    branch: body.branch,
    genre: body.genre,
    rollNo:body.rollNo,
    email: body.email

  })
}

const getLogIn = async(req, res) => {
  if (app.currentUser == null) {
    res.render('login');
  } else {
    res.redirect('/profile');
  }
}
const logIn = async(req, res) => {

  if (!req.body.email||!req.body.college||!req.body.password) {
    throw new Error("All fields are necessary!")
  } else {
    const credentials = Realm.Credentials.emailPassword(req.body.email+req.body.college, req.body.password);
    try {
      const user = await app.logIn(credentials);
      console.log("Successfully logged in!", user.id);
      res.cookie("www.debuggers.com", `${user.id},true`)
      res.redirect('/profile');
    } catch (err) {
      console.error("Failed to log in", err.message);
    }

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
    if (app.currentUser !== null) {
      console.log(app.currentUser);
      res.render('profile');
    } else {
      res.redirect('/');
    }
  } catch (e) {
    console.error("Profile Error: ", e);
  }

}



module.exports={
  getHome,
  getSignUp,
  signUp,
  getForm,
  getLogIn,
  logIn,
  logOut,
  getProfile
}
