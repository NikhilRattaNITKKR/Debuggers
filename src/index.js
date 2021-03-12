const app = require('./app');
const {MongoClient} = require('mongodb');

const client = MongoClient(process.env.MONGODB_URI || "mongodb+srv://owner:debuggers204@cluster0.mjejk.mongodb.net/Debuggers?retryWrites=true&w=majority", { useUnifiedTopology: true });

const port= process.env.PORT || 3000;

var Users, Events, Doubts;


app.listen(port, async ()=>{

  try {
    await client.connect();
    console.log('Mongo Connected');
    Users = await client.db('Debuggers').collection('Users');
    Events = await client.db('Debuggers').collection('Events');
    Doubts = await client.db('Debuggers').collection('Doubts');



    app.set('Users', Users);
    app.set('Events', Events);
    app.set('Doubts', Doubts);

    // console.log('Events: ', Events);


  } catch (e) {
    console.error(e);
  }



  console.log("Server started");
});
