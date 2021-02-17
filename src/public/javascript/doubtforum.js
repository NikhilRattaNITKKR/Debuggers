$(".fa-arrows-alt-v").click(function(){
   $(this).parent().siblings(".toggle-by-arrow").animate({
     height: "toggle"
   });
});


$(".new-post-text").click(function(){
  $(".doubt-section").addClass("doubt-section-none");
  $(".post-a-doubt").addClass("post-a-doubt-display");
})

$("#cancel-btn").click(function(){
  $(".doubt-section").removeClass("doubt-section-none");
  $(".post-a-doubt").removeClass("post-a-doubt-display");
})
