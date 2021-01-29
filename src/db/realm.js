const Realm = require("realm");
const BSON = require("bson");

const app = new Realm.App({ id: "debuggers-lzxyc" });

const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'objectId',
    _partition: 'string?',
    name: 'string',
    status: 'string',
  },
  primaryKey: '_id',
};

const email="nikhil_11915103@nitkkr.ac.in";
const password="nikhil103";

// Create an email/password credential
const fun=async ()=>{

try {
  //const credentials = await app.emailPasswordAuth.registerUser(email, password);
  const credentials = Realm.Credentials.emailPassword(
email,
password
);
  const user = await app.logIn(credentials);
  console.log(JSON.stringify(user));
  console.log("Successfully logged in!", user.id);
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  console.log(app.currentUser);
  const users = mongodb.db("Debuggers").collection("Events");
  const result = await users.insertOne({
   title:"jhasvchjvas",
   desc:"cascas"
  });
  console.log(result);

  /*
  realm.write(() => {                    //Creating the data
    const newTask = realm.create("Task", {
      _id: new BSON.ObjectID(),
      name: "go grocery shoppijcdbhjsdbcng",
      status: "Open",
    });
  });  */
console.log("Successfully done");
} catch (err) {
  console.error("Failed to log in", err);
}
}
fun();
