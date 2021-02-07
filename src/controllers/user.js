const Realm = require("realm");
const BSON = require("bson");

const app = new Realm.App({ id: "debuggers-lzxyc" });
const mongodb = app.currentUser.mongoClient("mongodb-atlas");
const users = mongodb.db("Debuggers").collection("Users");


const getHome = async(req, res) => {
  console.log(getCookieValue(req));
  if (getCookieValue(req)) {
    res.redirect('/profile');
  } else {
    res.render('home');
  }
}


const getSignUp = function(req, res) {
  if (getCookieValue(req)) {
    res.redirect('/profile');
  } else {
    res.render('signup');
  }
}
const signUp = async(req,res)=>{


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

}

const getLogIn = async(req, res) => {
  if (getCookieValue(req)) {
    res.redirect('/profile');
  } else {
    res.render('login');
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
 function getCookieValue (req) {
  const cookieName = "www.debuggers.com";
  const id  =  req.cookies.cookieName;
  const user = users.findOne({_id: id})
  if (user == null) {
    return false;
  } else {
    return true;
  }
}



module.exports={
  getHome,
  getSignUp,
  signUp,
  getLogIn,
  logIn
}
