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
