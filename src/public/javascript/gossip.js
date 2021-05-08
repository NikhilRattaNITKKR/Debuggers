$('.group-div').on("click",function(){
  $('.group-div').removeClass('group-active');
  $(this).addClass('group-active');
});


$(window).on("load",function(){
  const divmsg = $('.messages-container');
  divmsg.scrollTop(divmsg.height());
});
