const Realm = require('realm');
const BSON = require('bson');
const ejs = require('../public/javascript/ejs');


// const app = new Realm.App({ id: "debuggers-lzxyc" });
let doubts = [];
let user;


if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}



const getDoubtForum = async(req, res) =>{
  try {
    if (req.cookies.uid) {
      const Users = req.app.get('Users');
      const Doubts = req.app.get('Doubts');



      let todayDoubts = [];
      let yesterdayDoubts = [];
      let thisWeekDoubts = [];
      let thisMonthDoubts = [];
      let otherDoubts = [];


      doubts = await Doubts.find().toArray()
      .then(result => {
        if (result) {
          // console.log(result);
          return result;
        }
      });


      if (!localStorage.user) {
        try {
          console.log('Doesnot Exist');
          let user = await Users.findOne({_id: new BSON.ObjectId(req.cookies.uid.toString())})
          localStorage.setItem('user',JSON.stringify(user))
        } catch (e) {
          console.error(e);
        }
      }
      user = JSON.parse(localStorage.getItem('user'))
      // console.log(user);


      //Popular Doubts Algo
      // let votes = [];

      // Division of Doubts According to their timings
      for (let i = doubts.length -1; i>=0; i--) {
        // votes[i] = doubts[i].upvotes.length - doubts.downvotes.length;
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

      res.render('doubtforum', {user, doubts, todayDoubts, yesterdayDoubts,  thisWeekDoubts, thisMonthDoubts, otherDoubts, ejs});

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

  const Doubts = req.app.get('Doubts');

  let domain = user.email.split('@');
  domain = domain[1];

  let userName = "Anonymous"
  if(req.body.postType === "User") userName = user.name;

  try {
    const result = await Doubts.insertOne({
      _id: new BSON.ObjectId,
      uid: new BSON.ObjectId(user._id.toString()),
      userName: userName,
      question: req.body.question.trim(),
      desc: req.body.desc.trim(),
      upvotes: [],
      downvotes: [],
      domain: domain,
    })


    console.log(result);

    res.redirect('/doubtforum')

  } catch (err) {
    console.error("Create Doubt Error: ", err);
  }
}


const createAnswer = async(req, res) => {

  const Doubts = req.app.get('Doubts');


  try {
    //  if() Add radio Buton value Here

    const result = await Doubts.updateOne({
      _id: new BSON.ObjectId(req.params.id)
    },
    {
      $addToSet: {
        answers: {
          _id: new BSON.ObjectId(),
          uid: new BSON.ObjectId(user._id.toString()),
          name: user.name,
          answer: req.body.answer,
          upvotes: [],
          downvotes: [],
        }
      }
    });

  } catch (e) {
    console.error("User Get Error: ", e);
  }
  res.redirect('/doubtforum');
}

const createComment = async(req, res) => {

  const Doubts = req.app.get('Doubts');

  let user = JSON.parse(localStorage.getItem('user'))

  try {
    let name = user.name;
    console.log(name);
    const result = await Doubts.updateOne({
      answers: {$elemMatch: {_id: new BSON.ObjectId(req.params.aid)}}
    },
    {
      $addToSet:{"answers.$.comments":{
        uid: new BSON.ObjectId(user._id.toString()),
        image: user.image,
        comment: req.body.comment,
      }
    }
  })
  console.log('Create COmment Result: ', result);

} catch (e) {
  console.error("Create Comment Error: ", e);
}
res.redirect('/doubtforum');
}

const updateDoubt = async(req, res) => {
  let id = req.params.id.toString().trim();
  let action = req.query.action;
  let user = JSON.parse(localStorage.getItem('user'));

  const Doubts = req.app.get('Doubts');

  if(action === 'upvote') {
    console.log('Upvote');

    let result = await Doubts.updateOne(
      {
        _id: new BSON.ObjectId(id)
      },
      {
        $addToSet: {
          upvotes: [
            new BSON.ObjectId(user._id.toString())
          ]
        },
        $pull: {
          downvotes: {
            $in: [
              new BSON.ObjectId(user._id.toString())
            ]
          }
        }
      }
    )

    // console.log('Result: ', result);
  } else if (action === 'downvote') {
    console.log('downVote');
    await Doubts.updateOne(
      {
        _id: new BSON.ObjectId(id)
      },
      {
        $addToSet: {
          downvotes: [
            new BSON.ObjectId(user._id.toString())
          ]
        },
        $pull: {
          upvotes: {
            $in: [
              new BSON.ObjectId(user._id.toString())
            ]
          }
        }
      }
    )
  }
}

const updateAnswer = async(req, res) => {
  let id = req.params.aid.toString().trim();
  let action = req.query.action;
  let user = JSON.parse(localStorage.getItem('user'));

  const Doubts = req.app.get('Doubts');

  if(action === 'upvote') {
    console.log(action);

    let result = await Doubts.updateOne(
      {
        answers: {$elemMatch: {_id: new BSON.ObjectId(id)}}
      },
      {
        $addToSet: {
          "answers.$.upvotes":[
            new BSON.ObjectId(user._id.toString())
          ]
        },
        $pull: {
          "answer.$.downvotes": {
            $in: [
              new BSON.ObjectId(user._id.toString())
            ]
          }
        }
      }
    )

    console.log(result);
  } else if (action === 'downvote') {
    console.log(action);


    await Doubts.updateOne(
      {
        answers: {$elemMatch: {_id: new BSON.ObjectId(id)}}
      },
      {
        $addToSet: {
          "answers.$.downvotes":[
            new BSON.ObjectId(user._id.toString())
          ]
        },
        $pull: {
          "answer.$.upvotes": {
            $in: [
              new BSON.ObjectId(user._id.toString())
            ]
          }
        }
      }
    )
  }
}

const editDoubt = async(req, res) => {
  let id = req.params.id.toString().trim();
  const Doubts = req.app.get('Doubts');
  let user = JSON.parse(localStorage.getItem('user'));


  try {
    let result = await Doubts.updateOne(
      {
        _id: new BSON.ObjectId(id)
      },
      {
        $set: {
          question: req.body.question,
          desc: req.body.desc
        }
      },
      {upsert: false}
    )

    res.redirect('/doubtforum')
  } catch (e) {
    console.error(e);
  }
}



module.exports = {
  getDoubtForum,
  createDoubt,
  getSpecificDoubt,
  createAnswer,
  createComment,
  updateDoubt,
  updateAnswer,
  editDoubt,
}
