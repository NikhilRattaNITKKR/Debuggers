var btn1 = 0;
var btn2 = 0;
$('.btn1').click(function(){
  btn1 = 1;
  btn2 = 0;
});
$('.btn2').click(function(){
  btn1 = 0;
  btn2 = 1;
});
if (btn1 == 1 && btn2 == 0){
  $('.btn1').classList.add('active');
}
if (btn2 == 1 && btn1 == 0){
  $('.btn2').classList.add('active');
}
