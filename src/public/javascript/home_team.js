// $('.before0').on("mouseenter", function(){
//   $(this).css("display","none");
//   $('.thumbnail0').css({
//     "border": "1px dashed black",
//     "border-radius": "25px"
//   });
//   $('.loading0').css({
//     "display": "block"
//   });
// });
//
// $('.loading0').on("mouseleave",function(){
//   $(this).css("display","none");
//   $('.before0').css("display","block");
//   $('.thumbnail0').css({"border": "none"});
// });
//
// /* -------- */
//
// $('.before1').on("mouseenter", function(){
//   $(this).css("display","none");
//   $('.thumbnail1').css({
//     "border": "1px dashed black",
//     "border-radius": "25px"
//   });
//   $('.loading1').css({
//     "display": "block"
//   });
// });
//
// $('.loading1').on("mouseleave",function(){
//   $(this).css("display","none");
//   $('.before1').css("display","block");
//   $('.thumbnail1').css({"border": "none"});
// });
//
// /* -------- */
//
// $('.before2').on("mouseenter", function(){
//   $(this).css("display","none");
//   $('.thumbnail2').css({
//     "border": "1px dashed black",
//     "border-radius": "25px"
//   });
//   $('.loading2').css({
//     "display": "block"
//   });
// });
//
// $('.loading2').on("mouseleave",function(){
//   $(this).css("display","none");
//   $('.before2').css("display","block");
//   $('.thumbnail2').css({"border": "none"});
// });
//
// /* -------- */
//
// $('.before3').on("mouseenter", function(){
//   $(this).css("display","none");
//   $('.thumbnail3').css({
//     "border": "1px dashed black",
//     "border-radius": "25px"
//   });
//   $('.loading3').css({
//     "display": "block"
//   });
// });
//
// $('.loading3').on("mouseleave",function(){
//   $(this).css("display","none");
//   $('.before3').css("display","block");
//   $('.thumbnail3').css({"border": "none"});
// });
//
// /* -------- */
//
//
// $('.before4').on("mouseenter", function(){
//   $(this).css("display","none");
//   $('.thumbnail4').css({
//     "border": "1px dashed black",
//     "border-radius": "25px"
//   });
//   $('.loading4').css({
//     "display": "block"
//   });
// });
//
// $('.loading4').on("mouseleave",function(){
//   $(this).css("display","none");
//   $('.before4').css("display","block");
//   $('.thumbnail4').css({"border": "none"});
// });

/* -------- */


var i = 0;
$('.meet-team').click(function(){
    var getOffset = $('#team-section').offset().top;

    if(i == 0 && j==0){
      $('html,body').animate({
        scrollTop: getOffset + 218.4
      },1200);
      i++;
    }
    else{
      $('html,body').animate({
        scrollTop: getOffset - 59.6
      },1200);
    }

});

var j =0;
$('.contact').click(function(){
  var getOffset = $('#contact-section').offset().top;

  if(j == 0 && i==0){
    $('html,body').animate({
      scrollTop: getOffset + 218.4
    },1200);
    j++;
  }
  else{
    $('html,body').animate({
      scrollTop: getOffset - 59.6
    },1200);
  }


});


$('#top-icon').click(function(){

  var getElement = $(this).attr('href');
  if ($(getElement).length){
    var getOffset = $(getElement).offset().top;
    $('html,body').animate({
      scrollTop: getOffset - 59.6
    },1200);
  }
});




var i =0;
$('.play-button').on("click",function(){
  var vid = $('.phone-video');
  if(i%2==0){
    vid.trigger('play');
    $('.play-button').css("opacity",0.5);
    $('.play-btn').removeClass('fa-play');
    $('.play-btn').addClass('fa-pause');
  }
  else{
    vid.trigger('pause');
    $('.play-button').css("opacity",1);
    $('.play-btn').removeClass('fa-pause');
    $('.play-btn').addClass('fa-play');
  }
  i++;
});



$(window).scroll(function(){
  var value = $(this).scrollTop();
  var margin;
  var newvalue;
  if(value<285*2){
    margin = -285+(value/2);
  }
  else{
     margin = 0;
  }

  $('.mid-section').css({
    "margin-top":`${margin}`+"px",
    "clip-path": "polygon(0% 0%, 0% 0%,"+ `${600 + value*3}`+"% 100%, 0% 100%)"
  });


  if(value>1490){
    $('.col-container').animate({
      opacity:"1"
    });
  }

});

$('.f-x').click(function(){
  $(this).parent().parent().parent().css("display","none");
  $(this).parent().parent().parent().siblings('.m-name').css("display","none");
  $('.photo-m img').css("opacity","0.7");
  $('.r3').css("transform","translateY(0)");
  $('.r1').css("transform","translate(0)");
  $('.r2').css("transform","translateX(0)");
  $('.r4').css("transform","translateX(0)");
  $('.r5').css("transform","translate(0)");
  $('.p1, .p2, .p4, .p3, .p5').css("transform","translate(0px)");
  if(rolClick%2 != 0){
    rolClick = 0;
  }

});




$('.p1').click(function(){
  $('.photo-m, .roles').css("opacity","1");
  $('.m-name, .m-icons').css("display","none");
  $('.photo-m img').css("opacity","0.7");
  $(this).css("transform",'translate(0,0)');
  $(this).siblings('.m-name, .m-icons').css("display","block");

  $('.p1 img').css("opacity","1");
  $('.r3').css("transform","translateY(65px)");
  $('.r1').css("transform","translate(-10px, -10px)");
  $('.r2, .r4').css("transform","translateX(45px)");
  $('.r5').css("transform",'translate(30px, 15px)');
  $('.p2, .p4').css("transform","translateX(45px)");
  $('.p3, .p5').css("transform","translate(55px,55px)");
  rolClick = 0;
});



$('.p2').click(function(){
  $('.photo-m, .roles').css("opacity","1");
  $('.m-name, .m-icons').css("display","none");
  $('.photo-m img').css("opacity","0.7");
  $(this).css("transform",'translate(0,0)');
  $(this).siblings('.m-name, .m-icons').css("display","block");

  $('.p2 img').css("opacity","1");
  $('.r2, .p4').css("transform","translate(-35px,-20px)");
  $('.r4').css("transform","translate(-35px,-8px)");
  $('.r5').css("transform","translateY(25px)");
  $('.p3, .p5').css("transform","translate(-30px, 20px)");
  $('.r3').css("transform","translateX(-25px)");
  rolClick = 0;
});


$('.p3').click(function(){
  $('.photo-m, .roles').css("opacity","1");
  $('.m-name, .m-icons').css("display","none");
  $('.photo-m img').css("opacity","0.7");
  $(this).css("transform",'translate(0,0)');
  $(this).siblings('.m-name, .m-icons').css("display","block");

  $('.p3 img').css("opacity","1");
  $('.r5').css("transform","translateX(45px)");
  $('.p2').css("transform","translate(25px, -30px)");
  $('.r3, .p5').css("transform",'translate(-35px,20px)');
  $('.r2,.r4,.p4').css("transform",'translate(0,0)');
  rolClick = 0;
})



$('.p4').click(function(){
  $('.photo-m, .roles').css("opacity","1");
  $('.m-name, .m-icons').css("display","none");
  $('.photo-m img').css("opacity","0.7");
  $(this).css("transform",'translate(0,0)');
  $(this).siblings('.m-name, .m-icons').css("display","block");

  $('.p4 img').css("opacity","1");
  $('.r3').css("transform","translateY(65px)");
  $('.r1, .r4').css("transform","translate(-10px, -10px)");
  $('.r2, .p2').css("transform","translateX(75px)");
  $('.r5').css("transform",'translate(30px, 15px)');
  $('.p1').css("transform",'translate(-20px,0)')
  $('.p3, .p5').css("transform","translate(55px,55px)");
  rolClick = 0;

});

$('.p5').click(function(){
  $('.photo-m, .roles').css("opacity","1");
  $('.m-name, .m-icons').css("display","none");
  $('.photo-m img').css("opacity","0.7");
  $(this).css("transform",'translate(0,0)');
  $(this).siblings('.m-name, .m-icons').css("display","block");

  $('.p5 img').css("opacity","1");
  $('.r1, .p1').css("transform","translate(-25px, -30px)");
  $('.p3').css("transform","translate(65px, -25px)");
  $('.p2').css("transform",'translate(40px, -10px)');
  $('.r5').css("transform","translateX(50px)");
  $('.r3').css("transform","translate(-30px, 20px)");
  rolClick = 0;
});

var rolClick = 0
$('.r1').click(function(){
  if(rolClick%2 == 0){
    $('.p1 img').css("opacity","1");
    $('.photo-m, .roles').css("opacity","0.4");
    $('.p1').css("opacity","1");
    $(this).css("opacity","1");
  }
  else{
    $('.p1 img').css("opacity","0.7");
    $('.photo-m, .roles').css("opacity","1");

  }
  rolClick++;
});

$('.r2').click(function(){
  if(rolClick%2 == 0){
    $('.p1 img, .p2 img, .p3 img').css("opacity","1");
    $('.photo-m, .roles').css("opacity","0.4");
    $('.p1, .p2, .p3').css("opacity","1");
    $(this).css("opacity","1");
  }
  else{
    $('.p1 img, .p2 img, .p3 img').css("opacity","0.7");
    $('.photo-m, .roles').css("opacity","1");

  }
  rolClick++;
});

$('.r3').click(function(){
  if(rolClick%2 == 0){
    $('.p5 img').css("opacity","1");
    $('.photo-m, .roles').css("opacity","0.4");
    $('.p5').css("opacity","1");
    $(this).css("opacity","1");
  }
  else{
    $('.p5 img').css("opacity","0.7");
    $('.photo-m, .roles').css("opacity","1");

  }
  rolClick++;
});

$('.r4').click(function(){
  if(rolClick%2 == 0){
    $('.p4 img').css("opacity","1");
    $('.photo-m, .roles').css("opacity","0.4");
    $('.p4').css("opacity","1");
    $(this).css("opacity","1");
  }
  else{
    $('.p4 img').css("opacity","0.7");
    $('.photo-m, .roles').css("opacity","1");

  }
  rolClick++;
});

$('.r5').click(function(){
  if(rolClick%2 == 0){
    $('.p2 img').css("opacity","1");
    $('.photo-m, .roles').css("opacity","0.4");
    $('.p2').css("opacity","1");
    $(this).css("opacity","1");
  }
  else{
    $('.p2 img').css("opacity","0.7");
    $('.photo-m, .roles').css("opacity","1");

  }
  rolClick++;
});
