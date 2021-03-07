const Realm = require('realm');
const BSON = require('bson');
const ejs = require('../public/javascript/ejs');


const app = new Realm.App({ id: "debuggers-lzxyc" });
let doubts = [];
let user;


if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

function getMongo() {
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const Users = mongodb.db("Debuggers").collection('Users');
  const Doubts = mongodb.db("Debuggers").collection('Doubts');

  return {users: Users, doubts: Doubts}
}



const getDoubtForum = async(req, res) =>{
  try {
    if (req.cookies.uid) {
      const mongo = getMongo();
      const Users = mongo.users;
      const Doubts = mongo.doubts;

      let todayDoubts = [];
      let yesterdayDoubts = [];
      let thisWeekDoubts = [];
      let thisMonthDoubts = [];
      let otherDoubts = [];

      doubts = await Doubts.find();


      if (!localStorage.user) {
        try {
          console.log('Doesnot Exist');
          let user = await Users.findOne({_id: new BSON.ObjectID(req.cookies.uid.toString())})
          localStorage.setItem('user',JSON.stringify(user))
        } catch (e) {
          console.error(e);
        }
      }
      user = JSON.parse(localStorage.getItem('user'))

      //Popular Doubts Algo
      let votes = [];

      // Division of Doubts According to their timings
      for (let i = doubts.length -1; i>=0; i--) {
        votes[i] = doubts[i].upvotes.length - doubts.downvotes.length;
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

      //// TODO: How to Sort Doubts with help of votes

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

  const Doubts =  getMongo().doubts;
  let domain = user.email.split('@');
  domain = domain[1];

  let userName = "Anonymous"
  if(req.body.postType === "User") userName = user.name;

  try {
    const result = await Doubts.insertOne({
      _id: new BSON.ObjectID,
      uid: new BSON.ObjectID(user._id.toString()),
      userName: userName,
      question: req.body.question,
      desc: req.body.desc,
      upvotes: {},
      downvotes: {},
      domain: domain,
    })


    console.log(result);

    res.redirect('/doubtforum')

  } catch (err) {
    console.error("Create Doubt Error: ", err);
  }
}


const createAnswer = async(req, res) => {

  const Doubts = getMongo().doubts;

  try {
    //  if() Add radio Buton value Here

    const result = await Doubts.updateOne({
      _id: new BSON.ObjectID(req.params.id)
    },
    {
      $addToSet: {
        answers: {
          _id: new BSON.ObjectID(),
          uid: new BSON.ObjectID(user._id.toString()),
          name: user.name,
          answer: req.body.answer
        }
      }
    });

  } catch (e) {
    console.error("User Get Error: ", e);
  }
  res.redirect('/doubtforum');
}

const createComment = async(req, res) => {

  const Doubts = getMongo().doubts;

  try {
    let name = user.name;
    console.log(name);
    const result = await Doubts.updateOne({
      answers: {$elemMatch: {_id: new BSON.ObjectID(req.params.aid)}}
    },
    {
      $addToSet:{"answers.$.comments":{
        uid: new BSON.ObjectID(user._id.toString()),
        image: null,
        comment: req.body.comment,
      }
    }
  })
  console.log(result);

} catch (e) {
  console.error("Create Comment Error: ", e);
}
res.redirect('/doubtforum');
}




module.exports = {
  getDoubtForum,
  createDoubt,
  getSpecificDoubt,
  createAnswer,
  createComment,
}
