var bool = 1;
 $('.fa-bars').on("click", function(){

   // setTimeout(function(){
   //   $("#left").toggleClass("left-section-min");
   //   $('.mid-section').toggleClass("mid-section-max");
   // }, 100);
   bool = bool+1;
   $('#left').animate({
    width: 'toggle'
   });

   if(bool%2 == 0){
   $('.mid-section').animate({
     left: '0vw',
     width: '100%'
   });

 }
 else{
   $('.mid-section').animate({
     left: '15vw',
     width: '84.9%'
   });
 }

 });


$('.tr-post-hover').on("mouseenter",function(){
 $(this).css("opacity","1");
});

$('.tr-post-hover').on("mouseleave",function(){
 $(this).css("opacity","0");
});
