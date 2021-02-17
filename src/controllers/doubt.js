const Realm = require('realm');
const BSON = require('bson');


const app = new Realm.App({ id: "debuggers-lzxyc" });

function getMongo() {
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const Users = mongodb.db("Debuggers").collection('Users');
  const Doubts = mongodb.db("Debuggers").collection('Doubts');

  return {users: Users, doubts: Doubts}
}



const getDoubtForum = async(req, res) =>{
  if (app.currentUser !== null) {
    const mongo = getMongo();
    const Users = mongo.users;
    const Doubts = mongo.doubts;

    let doubts = await Doubts.find();
    let user  = await Users.find();
    let users = [];

    for (let i = 0; i<doubts.length; i++) {
      for ( let j = 0; j<user.length; j++ ) {
        if(doubts[i].uid.toString() === user[j]._id.toString()) {
          users[i] = user[j];
        }
      }
    }




    res.render('doubtforum', {users: users, doubts: doubts});
  } else {
    res.redirect('/');
  }
}


const createDoubt = async(req, res) => {
  const mongo = getMongo();
  const Users = mongo.users;
  const Doubts = mongo.doubts;

  let userName = 0;
  if(req.body.postType === "User") userName = 1;

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




module.exports = {
  getDoubtForum,
  createDoubt,
}
