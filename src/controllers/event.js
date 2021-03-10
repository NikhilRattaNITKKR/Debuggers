const Realm = require("realm");
const BSON = require("bson");
const ejs = require('../public/javascript/ejs');


const app = new Realm.App({ id: "debuggers-lzxyc" });

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


function getMongo() {
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const Users = mongodb.db("Debuggers").collection('Users');
  const Events = mongodb.db("Debuggers").collection('Events');

  return {users: Users, events: Events};
}



const getEvents = async(req, res) =>{
  try{
    if (req.cookies.uid) {
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

const getSpecificEvent = async(req, res) =>{
  let id = req.params.id;
  const Events = getMongo().events;
  let specificEvent = {};

  try {
    specificEvent = await Events.findOne({_id: new BSON.ObjectId(id)});
  } catch (e) {
    console.error(e.message);
  }
  res.json({data: specificEvent});
}















module.exports = {
  getEvents,
  getSpecificEvent,
}
