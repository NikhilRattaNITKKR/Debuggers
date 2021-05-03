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
  $('.right-post').css("opacity","0.1");
  $('.left-post').css("opacity","0.1");
  $('.full-post-div').css("display","flex");
  $('.full-post-div').animate({
    width: "100%"
  },800,function(){

  });
  $(window).scrollTop(0);
});

$('#post-toggler').on("click",function(){
  $('.right-post').fadeTo("slow",0.2);
  $('.left-post').fadeTo("slow",0.3);
  $('.full-post-div').animate({
    width: "0%"
  },600,function(){
    $('.full-post-div').css("display","none");
  });
});






// posts



var genre ="";

$(".checkbox").click(function(e){

  if($(this).prop("checked")== true){
  genre = genre+$(this).parent().text() + " ";
  $(".dropdown_button").val(genre);
  }


  else if($(this).prop("checked")== false){
    var newgenre = genre.split(" ");
    console.log(newgenre);
    for(var i=0;i<newgenre.length; i++){
      if (newgenre[i] ==  $(this).parent().text()){
        newgenre.splice(i,1);
        console.log(newgenre);
      }
    }
    var temp= "";
    for(var i=0; i<newgenre.length-1;i++){
      temp = temp + newgenre[i] + " ";
    }
    genre = temp;

    $(".dropdown_button").val(temp);

  }
});


$('#closepost').click(function(){
  $('.create-event-div-over').css("display","none");
});

$('.create-event-div').click(function(){
  $('.create-event-div-over').css("display","block");
});


$('.fa-bookmark').on("click",function(){
  $(this).toggleClass("fa");
  $(this).toggleClass("far");
  var cc = $(this).attr("onclick");
  var ccSplit= cc.split('A');


  if(ccSplit[0] === "take"){
    var newatt = "undoA"+ccSplit[1];
    $(this).attr("onclick",newatt);
    console.log(newatt);
  }

  if(ccSplit[0] === "undo"){
    var newatt = "takeA"+ccSplit[1];
    $(this).attr("onclick",newatt);
    console.log(newatt);
  }

  // var p = $(this).parent();
   // p.load(location.href + ' .fa-bookmark');




});

$('.fa-heart').on("click",function(){
  $(this).toggleClass("fa");
  $(this).toggleClass("far");

  var cc = $(this).attr("onclick");
  var ccSplit= cc.split('A');

  if(ccSplit[0] === "take"){
    var newatt = "undoA"+ccSplit[1];
    $(this).attr("onclick",newatt);
    console.log(newatt);
  }
  else if(ccSplit[0] === "undo"){
    var newatt = "takeA"+ccSplit[1];
    $(this).attr("onclick",newatt);
    console.log(newatt);
  }
})
