const Realm = require('realm');

const app = new Realm.App({ id: "debuggers-lzxyc" });
const mongodb = app.currentUser.mongoClient("mongodb-atlas");
const Users = mongodb.db("Debuggers").collection("Users");
const Events = mongodb.db("Debuggers").collection("Events");

const currentUserId =  app.currentUser.id;

const user = null;
async function () => {
  user = await Users.findOne({_id: currentUserId});

}

const getEvent = async (req, res) => {
return 0;
}
