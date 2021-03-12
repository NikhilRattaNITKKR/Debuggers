$(".fa-arrows-alt-v").click(function(){
   $(this).parent().siblings(".toggle-by-arrow").animate({
     height: "toggle"
   });
});




$(".new-post-text").click(function(){
  $('.spinner-con').css("display","none");
setTimeout(function(){
  $(".doubt-section").addClass("doubt-section-none");
  $(".post-a-doubt").addClass("post-a-doubt-display");
},300);

});

$("#cancel-btn").click(function(){
  $('.spinner-con').css("display","flex");
setTimeout(function(){
  $(".doubt-section").removeClass("doubt-section-none");
  $(".post-a-doubt").removeClass("post-a-doubt-display");
},300);

});



// $(".add-a-comment").click(function(){
// setTimeout(function(){
//   $("#new-comment-div").css("display","flex");
//   $(".new-comment-input").focus();
// },200);
//
//
// });
//
// $("#new-btn-cancel").click(function(){
// setTimeout(function(){
//     $("#new-comment-div").css("display","none");
//     $(".new-comment-input").val("");
// },200);
//
// });
//
// $("#answer-trigger").click(function(){
//   setTimeout(function(){
//     $("#answer-pop").css("display","block");
//   },300);
//   setTimeout(function(){
//     $("#answer-input").focus();
//   },600);
//
// });
//
// $(".cancel-answer").click(function(){
//   setTimeout(function(){
//     $("#answer-pop").css("display","none");
//     $("#answer-input").val("");
//   },300);
// });


function addComment(){
  $(".add-a-comment").on("click",function(){

      $(this).parent().find('ul').find(".add-comment").fadeIn(300);
      $(this).parent().find('ul').find(".add-comment").css("display","flex");
      $(".new-comment-input").focus();
  });
}

function cancelComment(){


      $(".new-comment-btn-cncl").on("click",function(){
        var temp = $(this);
        $(this).parent().parent().parent().parent().fadeOut(300);
        setTimeout(function(){
          temp.parent().parent().parent().parent().css("display","none");
        },400);

        $(".new-comment-input").val("");
      })



}


function addAnswer(){
  setTimeout(function(){
    $("#answer-pop").css("display","block");
  },300);
  setTimeout(function(){
    $("#answer-input").focus();
  },600);
}

function cancelAnswer(){
  setTimeout(function(){
    $("#answer-pop").css("display","none");
    $("#answer-input").val("");
  },300);
}


$(".left-block-content").on("click",function(){
  $("#show-doubt").css("opacity","0.5");
  $(".spinner-con").css({
    "display" : "flex",
    "opacity" : "1"
  });
})



function xyz(){
  $("#show-doubt").css("opacity","1");
  $(".spinner-con").css("display","none");
}
