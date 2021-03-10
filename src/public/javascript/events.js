$('.img-container-inner').mouseover(function(){
  $(this).css("transform","translateY(-1vh)");
});

$('.img-container-inner').mouseleave(function(){
  $(this).css("transform","translateY(0)");
});


$('.search-bar input').focus(function(){
  $('.search-bar').css({
    "background":"rgba(255,255,255,0.4)",
    "border":"4px solid #FFE74C"
  });
  $(this).css("color","white");
  $('.fa-search').css({
    "transform":"rotate(360deg)",
    "color":"white"
  });
});
$('.search-bar input').blur(function(){
  $('.search-bar').css({
    "background":"none",
    "border":"4px solid white"
  });
  $('.fa-search').css({
    "transform":"rotate(0deg)",
    "color":"black"
  });
});


$(document).ready(function(){
  $('.list-it').css({
    "background":"#1700ff5c",
    "color":"white"
  });
  $('.list-i').css("color","white");
  // $('.full-post-div.').css("width","0");
});



$('.toggler-main-post').on("click",function(){
  $('.full-post-div').css("display","flex");
  $('.full-post-div').animate({
    width: "100%"
  },800,function(){
    $('.right-post').fadeTo("slow",1);
    $('.left-post').fadeTo("slow",1);
  });
  $(window).scrollTop(0);
});

$('#post-toggler').on("click",function(){
  $('.right-post').fadeTo("slow",0.1);
  $('.left-post').fadeTo("slow",0.1);
  $('.full-post-div').animate({
    width: "0%"
  },1000,function(){
    $('.full-post-div').css("display","none");
  });
})
