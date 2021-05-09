// const app = require('express')();
// // var io = app.get('io');
// const httpServer = require('http').createServer(app);
// var socket = require('socket.io');
// var io = socket(httpServer);
// var frmsg = require('../utils/msgs');
//
// const ioConnect = async function (req,res){
//
//
//   await io.on("connection", (socket)=>{
//   console.log("Socket Connected");
//
//
//
//   socket.emit('alerts', frmsg.formatMessage('Faisal','Welcome to Gossip Room'));
//
//   socket.broadcast.emit('alerts', frmsg.formatMessage('Faisal','A new User joined the chat'));
//
//   socket.on('disconnect',()=>{
//     io.emit('alerts', frmsg.formatMessage('Faisal','User has left the chat'));
//   });
//
//   socket.on('chatMessage', (msg)=>{
//     socket.broadcast.emit('message', frmsg.formatMessage('Faisal',msg));
//   });
//
// });
//
//
//  await res.render('gossip');
//
// }
//
//
//
// module.exports={
//   ioConnect
// }
