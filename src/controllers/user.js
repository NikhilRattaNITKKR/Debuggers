const Realm = require("realm");
const BSON = require("bson");
const ejs = require('../public/javascript/ejs');


const app = new Realm.App({ id: "debuggers-lzxyc" });

// const mongodb = app.currentUser.mongoClient("mongodb-atlas");
// const Users = mongodb.db("Debuggers").collection('Users');


function getMongo() {
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const Users = mongodb.db("Debuggers").collection('Users');
  const Events = mongodb.db("Debuggers").collection('Events');

  return {users: Users, events: Events};
}


const getHome = async(req, res) => {
  console.log("Get Home:", app.currentUser);
  try {
    if (app.currentUser != null) {
      res.redirect(`/profile/${app.currentUser.id}`);
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
  }

}


const getSignUp = function(req, res) {
  if (app.currentUser == null) {
    res.render('signup');
  } else {
    res.redirect(`/profile/${app.currentUser.id}`);
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
      _id: new BSON.ObjectID(user.id),
      name: body.name,
      branch: body.branch,
      genre: body.genre,
      rollNo:body.rollNo,
      email: body.email,
      gender: body.gender
    })

    console.log("Form: ", result);

    res.redirect(`/profile/${user.id}`)


  } catch (e) {
    console.error("Form Error: ", e);
  }

}


const getLogIn = async(req, res) => {
  if (app.currentUser == null) {
    res.render('login');
  } else {
    res.redirect(`/profile/${app.currentUser.id}`);
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
      res.redirect(`/profile/${user.id}`);
    }

  } catch (e) {
    console.error("Failed to log in", e);
  }
}
const logOut = async(req, res) => {
  try {
    if (app.currentUser != null) {
      await app.allUsers[app.currentUser.id].logOut();
    }
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

      const mongo = getMongo();
      const Users = mongo.users;
      const Events = mongo.events;

      const id = new BSON.ObjectID(req.params.id.toString());
      const user = await Users.findOne({_id: id});

      if (user == null) {
        await app.allUsers[app.currentUser.id].logOut();
        res.render('form', {title: "Detail Form"});
      } else {
        const events = await Events.find({uid: id});
  // to get id      console.log(events[0]._id);

        let image = user.image;

        res.render('profile', {user: user, events: events, image: image, ejs: ejs});
      }
    }
  } catch (e) {
    console.error("Get Profile Error: ", e);
  }
}





const getEvents = async(req, res) =>{
  try{
  if (app.currentUser !== null) {
    const mongo = getMongo();
    const Users = mongo.users;
    const Events = mongo.events;

    let events = await Events.find();
    let user = await Users.find();
    let users = [];
    for (let i = 0; i<events.length; i++) {
      for ( let j = 0; j<user.length; j++ ) {
        if(events[i].uid.toString() === user[j]._id.toString()) {
          users[i] = user[j];
        }
      }
    }




    res.render('events', {events: events, users: users});
  } else {
    res.redirect('/');
  }
}catch (e){
  console.log("Get Events error:",e);
}
}
/*
const upVote= async ()=>{

try {

  if (app.currentUser !== null) {
    const mongo = getMongo();
    const Events = mongo.events;
    const id=req.query.pid;

    const query = { "_id": id };
    const update =   { "$inc": { "votes": 1 } };
    const options = { "upsert": false };

    Events.updateOne(query, update, options)
      .then(result => {
        const { matchedCount, modifiedCount } = result;
        if(matchedCount && modifiedCount) {
          console.log(`Successfully updated the item.`)
        }
      })
      .catch(err => console.error(`Failed to update the item: ${err}`))

}else {
  res.redirect('/');
}
} catch (e) {
console.log("Upvote error:",e);
}
}

const downVote= async ()=>{

try {

  if (app.currentUser !== null) {
    const mongo = getMongo();
    const Events = mongo.events;
    const id=req.query.pid;
    const query = { "_id": id };
    const update =   { "$inc": { "votes": -1 } };
    const options = { "upsert": false };

    Events.updateOne(query, update, options)
      .then(result => {
        const { matchedCount, modifiedCount } = result;
        if(matchedCount && modifiedCount) {
          console.log(`Successfully updated the item.`)
        }
      })
      .catch(err => console.error(`Failed to update the item: ${err}`))

}else {
  res.redirect('/');
}
} catch (e) {
console.log("downvote error :",e);
}
}
*/
module.exports={
  getHome,
  getSignUp,
  signUp,
  form,
  getLogIn,
  logIn,
  logOut,
  getProfile,
  getEvents,
  //upVote,
  //downVote
}
