var socket = io();

socket.on('alerts', message=>{
  console.log(message);
});

socket.on('message', message =>{
  createMessageOthers(message.text);

  const divmsg = $('.messages-container');
  divmsg.scrollTop(divmsg.height());
});








$('.send-msg-btn button').on('click', (e)=>{

  e.preventDefault();

  var msg = $('.send-msg-input input').val();

  socket.emit('chatMessage',msg);

  createMessageClient(msg);

  $('.send-msg-input input').val("");

  const divmsg = $('.messages-container');
  divmsg.scrollTop(divmsg.height());
});


















function createMessageClient(message){
  $('.messages-container').append(`<div class="messages-div-user">
    <div class="message">

      <div class="message-text msg-txt-user">
          ${message}
      </div>
      <div class="user-profile-img-div">
        <div class="user-img msg-user">
          <img src="https://scontent.fbek1-1.fna.fbcdn.net/v/t1.6435-9/83219598_1280190498857198_5424995061551071232_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=90zBEATtGmUAX-Hl0DX&_nc_ht=scontent.fbek1-1.fna&oh=0c13467d1ee46605aac068fcc08c1b60&oe=60B4AAB4" alt="">
        </div>
      </div>
    </div>
  </div>`);

}


function createMessageOthers(message){
  $('.messages-container').append(`<div class="message-div-ot">
    <div class="message">
      <div class="user-profile-img-div">
        <div class="user-img">
          <img src="https://cdn.discordapp.com/attachments/838125123579674627/838125273340968960/IMG_20210418_140748_Bokeh.jpg" alt="">
        </div>
      </div>
      <div class="message-text">
          ${message}
      </div>
    </div>
  </div>`)
}
