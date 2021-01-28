var btn1 = 0;
var btn2 = 0;
 $('.btn1').click(function(){
   this.classList.add('active');
   if (btn2 == 1){
     btn2 = 0;
     $('button')[1].classList.remove('active');
   }
   btn1 = 1;
 });

 $('.btn2').click(function(){

   this.classList.add('active');
   if (btn1 == 1){
     btn1 = 0
     $('button')[0].classList.remove('active');
   }
   btn2 = 1;
 });
