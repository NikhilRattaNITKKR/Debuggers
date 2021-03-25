$('.before0').on("mouseenter", function(){
  $(this).css("display","none");
  $('.thumbnail0').css({
    "border": "1px dashed black",
    "border-radius": "25px"
  });
  $('.loading0').css({
    "display": "block"
  });
});

$('.loading0').on("mouseleave",function(){
  $(this).css("display","none");
  $('.before0').css("display","block");
  $('.thumbnail0').css({"border": "none"});
});

/* -------- */

$('.before1').on("mouseenter", function(){
  $(this).css("display","none");
  $('.thumbnail1').css({
    "border": "1px dashed black",
    "border-radius": "25px"
  });
  $('.loading1').css({
    "display": "block"
  });
});

$('.loading1').on("mouseleave",function(){
  $(this).css("display","none");
  $('.before1').css("display","block");
  $('.thumbnail1').css({"border": "none"});
});

/* -------- */

$('.before2').on("mouseenter", function(){
  $(this).css("display","none");
  $('.thumbnail2').css({
    "border": "1px dashed black",
    "border-radius": "25px"
  });
  $('.loading2').css({
    "display": "block"
  });
});

$('.loading2').on("mouseleave",function(){
  $(this).css("display","none");
  $('.before2').css("display","block");
  $('.thumbnail2').css({"border": "none"});
});

/* -------- */

$('.before3').on("mouseenter", function(){
  $(this).css("display","none");
  $('.thumbnail3').css({
    "border": "1px dashed black",
    "border-radius": "25px"
  });
  $('.loading3').css({
    "display": "block"
  });
});

$('.loading3').on("mouseleave",function(){
  $(this).css("display","none");
  $('.before3').css("display","block");
  $('.thumbnail3').css({"border": "none"});
});

/* -------- */


$('.before4').on("mouseenter", function(){
  $(this).css("display","none");
  $('.thumbnail4').css({
    "border": "1px dashed black",
    "border-radius": "25px"
  });
  $('.loading4').css({
    "display": "block"
  });
});

$('.loading4').on("mouseleave",function(){
  $(this).css("display","none");
  $('.before4').css("display","block");
  $('.thumbnail4').css({"border": "none"});
});

/* -------- */



$('.meet-team').click(function(){
  var getElement = $(this).attr('href');
  if ($(getElement).length){
    var getOffset = $(getElement).offset().top;
    $('html,body').animate({
      scrollTop: getOffset - 95
    },800);
  }
});

$('.contact').click(function(){
  var getElement = $(this).attr('href');
  if ($(getElement).length){
    var getOffset = $(getElement).offset().top;
    $('html,body').animate({
      scrollTop: getOffset -90
    },800);
  }
});


$('#top-icon').click(function(){
  console.log("Clicked");
  var getElement = $(this).attr('href');
  if ($(getElement).length){
    var getOffset = $(getElement).offset().top;
    $('html,body').animate({
      scrollTop: getOffset
    },900);
  }
});




var i =0;
$('.play-button').on("click",function(){
  var vid = $('.phone-video');
  if(i%2==0){
    vid.trigger('play');
  }
  else{
    vid.trigger('pause');
  }
  i++;
});



$(window).scroll(function(){
  var value = $(this).scrollTop();
  var margin;
  var newvalue;
  if(value<285*2){
    margin = -285+(value/2);
    console.log(margin);
  }
  else{
     margin = 0;
     console.log(margin);
  }



  $('.mid-section').css({
    "margin-top":`${margin}`+"px",
    "clip-path": "polygon(0% 0%, 0% 0%,"+ `${600 + value*2}`+"% 100%, 0% 100%)"
  });


});
