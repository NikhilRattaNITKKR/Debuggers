const Realm = require('realm');
const BSON = require('bson');
const ejs = require('../public/javascript/ejs');



const app = new Realm.App({ id: "debuggers-lzxyc" });

function getMongo() {
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const Users = mongodb.db("Debuggers").collection('Users');
  const Doubts = mongodb.db("Debuggers").collection('Doubts');

  return {users: Users, doubts: Doubts}
}


let doubts = [];

const getDoubtForum = async(req, res) =>{
  try {
    if (app.currentUser !== null) {
      const mongo = getMongo();
      const Users = mongo.users;
      const Doubts = mongo.doubts;

      let todayDoubts = [];
      let yesterdayDoubts = [];
      let thisWeekDoubts = [];
      let thisMonthDoubts = [];
      let otherDoubts = [];

      doubts = await Doubts.find();
      // let user  = await Users.find();




      for (let i = 0; i<doubts.length; i++) {

        let time = ejs.convertTime(doubts[i]._id.getTimestamp())

        if(time.includes('hour') || time.includes('min') || time.includes('sec')) {
          todayDoubts.push(doubts[i])
          // console.log('today:/ ', doubts[i] );

        } else  if(time.includes('day') && time.includes('1')) {
          yesterdayDoubts.push(doubts[i]);
          // console.log('yesterdayDoubts');

        } else if (time.includes('day') && !time.includes('1')) {
          thisWeekDoubts.push(doubts[i]);
          // console.log('thisWeekDoubts');

        } else if (time.includes('week')) {
          thisMonthDoubts.push(doubts[i]);
          // console.log('thisMonthDoubts');

        } else {
          otherDoubts.push(doubts[i]);
        }

      }


      res.render('doubtforum', {doubts, todayDoubts, yesterdayDoubts,  thisWeekDoubts, thisMonthDoubts, otherDoubts, ejs});

    } else {
      res.redirect('/');
    }
  } catch (e) {
    console.error('Error: ', e);
  }
}

const getSpecificDoubt = async(req, res) => {
  try {

    const Users = getMongo().users;
    var doubt;

    for (let i = 0; i < doubts.length; i ++) {
      if (req.params.id === doubts[i]._id.toString()) {
        doubt = doubts[i];
      }
    }


    res.json({doubt});


  } catch (err) {
    console.error("Fetch Error: ", err);
  }

}

const createDoubt = async(req, res) => {
  const mongo = getMongo();
  const Users = mongo.users;
  const Doubts = mongo.doubts;


  let userName = "Anonymous"
  if(req.body.postType === "User") userName = "user";

  try {
    const result = await Doubts.insertOne({
      _id: new BSON.ObjectID,
      uid: new BSON.ObjectID(app.currentUser.id),
      userName: userName,
      question: req.body.question,
      desc: req.body.desc,
      votes: 0,
    })


    console.log(result);

    res.redirect('/doubtforum')

  } catch (err) {
    console.error("Create Doubt Error: ", err);
  }
}


const createAnswer = async(req, res) => {
  try {
    const Doubts = getMongo().doubts;
    const Users = getMongo().users;

    const user = await Users.findOne({_id: new BSON.ObjectID(app.currentUser.id.toString())});
    try {

      if(user._id.toString() === app.currentUser.id.toString()) {
        //  if() Add radio Buton value Here
        let name = user.name;
        const result = await Doubts.updateOne({
          _id: new BSON.ObjectID(req.params.id)
        },
        {
          $addToSet: {
            answers: {
              _id: new BSON.ObjectID(),
              uid: new BSON.ObjectID(app.currentUser.id.toString()),
              name: name,
              answer: req.body.answer
            }
          }
        });
      }
    } catch (e) {
      console.error("User Get Error: ", e);
    }
    res.redirect('/doubtforum');
  } catch (e) {
    console.error("Create Answer Error: ", e);
  }
}

const createComment = async(req, res) => {
  try {
    const Users = getMongo().users;
    const Doubts = getMongo().doubts;

    let user = await Users.findOne({
      _id: new BSON.ObjectID(app.currentUser.id.toString())
    });

    try {
      if(user._id.toString() === app.currentUser.id.toString()) {
        let name = user.name;
        console.log(name);
        const result = await Doubts.updateOne({
          answers: {$elemMatch: {_id: new BSON.ObjectID(req.params.aid)}}
        },
        {
          $addToSet:{"answers.$.comments":{
            uid: new BSON.ObjectID(app.currentUser.id.toString()),
            image: null,
            comment: req.body.comment,
          }
        }
      })
      console.log(result);
    }
  } catch (e) {
    console.error("Create Comment Error: ", e);
  }
  res.redirect('/doubtforum')
} catch (e) {
  console.error("User Get Error: ", e);
}
}




module.exports = {
  getDoubtForum,
  createDoubt,
  getSpecificDoubt,
  createAnswer,
  createComment,
}
