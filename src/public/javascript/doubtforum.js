$(".fa-arrows-alt-v").click(function(){
   $(this).parent().siblings(".toggle-by-arrow").animate({
     height: "toggle"
   });
});




$(".new-post-text").click(function(){
setTimeout(function(){
  $(".doubt-section").addClass("doubt-section-none");
  $(".post-a-doubt").addClass("post-a-doubt-display");
},300);

});

$("#cancel-btn").click(function(){
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
  setTimeout(function(){
    $("#new-comment-div").css("display","flex");
    $(".new-comment-input").focus();
  },200);
}

function cancelComment(){
  setTimeout(function(){
      $("#new-comment-div").css("display","none");
      $(".new-comment-input").val("");
  },200);
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
