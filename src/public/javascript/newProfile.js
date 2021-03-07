$('.search-bar input').focus(function(){
  $('.search-bar').css({
    "background":"rgba(0,0,0,0.4)",
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

$('.fa-sign-out-alt').mouseover(function(){
  $('.log-out-text').css("display","block");
  $('.log-out-text').fadeTo("fast",1);
});
$('.fa-sign-out-alt').mouseleave(function(){
  $('.log-out-text').fadeTo("fast",0);
  $('.log-out-text').css("display","none");

});







$('#about').click(function(){

  $(this).addClass('border-ap');
  $('#skills').removeClass('border-ap');
  $('#genre').removeClass('border-ap');
  $('#interests').removeClass('border-ap');

  $('.skills').css("transform","translateY(44vh)");
  $('.genre').css("transform","translateY(44vh)");
  $('.interests').css("transform","translateY(44vh)");
  $('.about').css("z-index","100");

  setTimeout(function(){
    $('.skills').css("z-index","-10");
    $('.genre').css("z-index","-10");
    $('.interests').css("z-index","-10");
  },800);

  setTimeout(function(){
    $('.skills').css("transform","translateY(0)");
    $('.genre').css("transform","translateY(0)");
    $('.interests').css("transform","translateY(0)");
  },850);

  });

$('#skills').click(function(){

    $(this).addClass('border-ap');
    $('#about').removeClass('border-ap');
    $('#genre').removeClass('border-ap');
    $('#interests').removeClass('border-ap');

    $('.about').css("transform","translateY(44vh)");
    $('.genre').css("transform","translateY(44vh)");
    $('.interests').css("transform","translateY(44vh)");
    $('.skills').css("z-index","100");

    setTimeout(function(){
      $('.about').css("z-index","-10");
      $('.genre').css("z-index","-10");
      $('.interests').css("z-index","-10");
    },800);

    setTimeout(function(){
      $('.about').css("transform","translateY(0)");
      $('.genre').css("transform","translateY(0)");
      $('.interests').css("transform","translateY(0)");
    },850);

    });


$('#genre').click(function(){

        $(this).addClass('border-ap');
        $('#skills').removeClass('border-ap');
        $('#about').removeClass('border-ap');
        $('#interests').removeClass('border-ap');

        $('.about').css("transform","translateY(44vh)");
        $('.skills').css("transform","translateY(44vh)");
        $('.interests').css("transform","translateY(44vh)");
        $('.genre').css("z-index","100");

        setTimeout(function(){
          $('.about').css("z-index","-10");
          $('.skills').css("z-index","-10");
          $('.interests').css("z-index","-10");
        },800);

        setTimeout(function(){
          $('.about').css("transform","translateY(0)");
          $('.skills').css("transform","translateY(0)");
          $('.interests').css("transform","translateY(0)");
        },850);

});
$('#interests').click(function(){

    $(this).addClass('border-ap');
    $('#skills').removeClass('border-ap');
    $('#genre').removeClass('border-ap');
    $('#about').removeClass('border-ap');

    $('.about').css("transform","translateY(44vh)");
    $('.genre').css("transform","translateY(44vh)");
    $('.skills').css("transform","translateY(44vh)");
    $('.interests').css("z-index","100");

    setTimeout(function(){
      $('.about').css("z-index","-10");
      $('.genre').css("z-index","-10");
      $('.skills').css("z-index","-10");
    },800);

    setTimeout(function(){
      $('.about').css("transform","translateY(0)");
      $('.genre').css("transform","translateY(0)");
      $('.skills').css("transform","translateY(0)");
    },850);

    });
