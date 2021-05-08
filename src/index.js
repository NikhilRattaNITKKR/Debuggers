const app = require('./app');
const {MongoClient} = require('mongodb');
const client = MongoClient(process.env.MONGODB_URI || "mongodb+srv://owner:debuggers204@cluster0.mjejk.mongodb.net/Debuggers?retryWrites=true&w=majority", { useUnifiedTopology: true });
const httpServer = require('http').createServer(app);
var socket = require('socket.io');
var io = socket(httpServer);
var frmsg = require('./utils/msgs');

if (process.env.MONGODB_URI) {
  console.log(process.env.MONGODB_URI);
}





const port= process.env.PORT || 3000;


var Users, Events, Doubts;


httpServer.listen(port, async ()=>{

  try {

      await io.on("connection", (socket)=>{
      console.log("Socket Connected");



      socket.emit('alerts', frmsg.formatMessage('Faisal','Welcome to Gossip Room'));

      socket.broadcast.emit('alerts', frmsg.formatMessage('Faisal','A new User joined the chat'));

      socket.on('disconnect',()=>{
        io.emit('alerts', frmsg.formatMessage('Faisal','User has left the chat'));
      });

      socket.on('chatMessage', (msg)=>{
        socket.broadcast.emit('message', frmsg.formatMessage('Faisal',msg));
      });

    });

    await client.connect();
    console.log('Mongo Connected');
    Users = await client.db('Debuggers').collection('Users');
    Events = await client.db('Debuggers').collection('Events');
    Doubts = await client.db('Debuggers').collection('Doubts');



    app.set('Users', Users);
    app.set('Events', Events);
    app.set('Doubts', Doubts);




  } catch (e) {
    console.error(e);
  }



  console.log("Server started");

});
