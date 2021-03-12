const Realm = require("realm");
const BSON = require("bson");
const ejs = require('../public/javascript/ejs');


// const app = new Realm.App({ id: "debuggers-lzxyc" });

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


var users =[];
var allEvents = [];


const getEvents = async(req, res) =>{

  try{
    if (req.cookies.uid) {
      const Users = req.app.get('Users');
      const Events = req.app.get('Events');


      let events = await Events.find().toArray()
      .then(result => {
        if (result) {
          return result;
        }
      });
      let user = await Users.find().toArray()
      .then(result => {
        if (result) {
          // console.log(result);
          return result;
        }
      });
      let users = [];
      for (let i = 0; i<events.length; i++) {
        for ( let j = 0; j<user.length; j++ ) {
          if(events[i].uid.toString() === user[j]._id.toString()) {
            users[i] = user[j];
          }
        }
      }

      res.render('events',{events, users});



    } else {
      res.redirect('/');
    }
  } catch (e){
    console.log("Get Events error:",e);
  }
}

const getSpecificEvent = async(req, res) =>{
  let id = req.params.id;
  const Events = req.app.get('Events');
  const Users = req.app.get('Users');

  let specificEvent = {};
  let user = {};


  // for (var i = 0; i < allEvents.length; i++) {
  //   if (id === allEvents[i]._id.toString()) {
  //     specificEvent = allEvents[i];
  //     if(specificEvent.uid.toString() === users[i]._id.toString()) user = users[i];
  //     else console.log('No Such User Exists');
  
  //   }
  //   else console.log('No Such Event Exists');
  // }




  try {
    specificEvent = await Events.findOne({_id: new BSON.ObjectId(id)});
    user = await Users.findOne({_id: new BSON.ObjectID(specificEvent.uid.toString())});
  } catch (e) {
    console.error(e.message);
  }
  res.json({event: specificEvent, user});
}















module.exports = {
  getEvents,
  getSpecificEvent,
}
