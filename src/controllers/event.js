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
  let query = req.query.genre;
  let type = req.query.event;

  try{
    if (req.cookies.uid) {
      const Users = req.app.get('Users');
      const Events = req.app.get('Events'); //Get Database

      let uid = req.cookies.uid.toString();
      let user = await Users.findOne({_id: new BSON.ObjectId(uid)});
      localStorage.setItem('user', JSON.stringify(user));
      //Update LocalStorage


      let events = [];
      let users = [];


      if(type) {
        if(type === "trending") {

          events = await Events.find().sort({like: -1, participants: -1}).limit(10).toArray();
          let trending = [];
          for (var i = 0; i < events.length; i++) {

            var postDate = new Date(events[i]._id.getTimestamp());
            var currrentdate = Date.now();
            let ms = currrentdate - postDate;

            if(ms < 604800000)
            trending.push(events[i])
          }
          events = trending;


        } else if (type === "recent") {

        } else if (type === "archived") {
          let pids = user.archived;
          console.log(pids);

          for (var i = 0; i < pids.length; i++) {
            events[i] = await Events.findOne({_id: new BSON.ObjectId(pids[i].pid.toString())})
          }
        }
      } else {
        events = await Events.find(query ? {genre: query}: {}).toArray().then(result => {
          if (result) {
            // console.log(result);
            return result;
          } else {
            console.log("No Events to Show");
          }
        });
      } // Give Value to Events



      let alluser = await Users.find().toArray().then(result => {
        if (result) {
          // console.log(result);
          return result;
        }
      }); //Get All Users
      for (let i = 0; i<events.length; i++) {
        for ( let j = 0; j<alluser.length; j++ ) {
          if(events[i].uid.toString() === alluser[j]._id.toString()) {
            users[i] = alluser[j];
          }
        }
      } //Filter Users According To Events

      res.render('events',{events, users, user});



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
  let currentUser = JSON.parse(localStorage.getItem('user'));



  try {
    specificEvent = await Events.findOne({_id: new BSON.ObjectId(id)});
    user = await Users.findOne({_id: new BSON.ObjectId(specificEvent.uid.toString())});
  } catch (e) {
    console.error(e.message);
  }
  res.json({event: specificEvent, user, currentUser});
}

const searchEvent = async(req, res) => {
  const Events = req.app.get('Events');

  let results = await Events.aggregate([
    {
      "$search": {
        "autocomplete":{
          "query": `${req.query.query}`,
          "path": "title",
          "fuzzy": {
            "maxEdits": 2
          }
        }
      }
    }
  ]).toArray();
  console.log('Results: ', results);


  res.json({results})
}

const takeAction = async(req, res) => {
  console.log('Taking Action');
  let query = req.query.action;
  let pid = req.params.id;
  const Users = req.app.get('Users');
  const Events = req.app.get('Events');
  let uid = JSON.parse(localStorage.getItem('user'))._id.toString();


  if (query === "archive") {
    let result = await Users.updateOne(
      {
        _id: new BSON.ObjectId(uid)
      },
      {
        $addToSet: {
          archived: {
            pid: new BSON.ObjectId(req.params.id.toString())
          }
        }
      }
    );
    // console.log(result);
  } else if (query === "like") {
    console.log('Like');

    let result = await Events.updateOne({
      _id: new BSON.ObjectId(pid.toString())
    }, {
      $addToSet: {
        likes: [
          new BSON.ObjectId(uid)
        ]
      }
    })
    console.log('Like result ', result);
  } else if (query === 'comment') {
    console.log('Comment is On');
  }
}

const undoAction = async(req, res) => {
  console.log('Undoing Action');

  let query = req.query.action;
  let id = req.params.id.toString();
  const Users = req.app.get('Users');
  const Events = req.app.get('Events');
  let uid = JSON.parse(localStorage.getItem('user'))._id.toString();

  if(query === "archive") {

    let result = await Users.updateOne(
      {
        _id: new BSON.ObjectId(uid)
      },
      {
        $pull: {
          archived: {
            $in: [{pid: new BSON.ObjectId(id)}]
          }
        }
      }
    )
  } else if (query === "like") {
    console.log('Like');
    let result = await Events.updateOne(
      {
        _id: new BSON.ObjectId(id)
      },
      {
        $pull: {
          likes: {
            $in: [new BSON.ObjectId(uid)]
          }
        }
      }
    )
  }

}











module.exports = {
  getEvents,
  getSpecificEvent,
  searchEvent,
  takeAction,
  undoAction
}
