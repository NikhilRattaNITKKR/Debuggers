function ScrollAppear(){
  var x = document.querySelector('.first-block');
  var height = x.getBoundingClientRect().top;
  var screenPosition = window.innerHeight/2;

  if (height < screenPosition){
    x.classList.add('first-block-appear');
  }
}

function ScrollAppear2(){
  var x = document.querySelector('.second-block');
  var height = x.getBoundingClientRect().top;
  var screenPosition = window.innerHeight/2;

  if (height < screenPosition){
    x.classList.add('second-block-appear');
  }
}

function ScrollAppear3(){
  var x = document.querySelector('.third-block');
  var height = x.getBoundingClientRect().top;
  var screenPosition = window.innerHeight/2;

  if (height < screenPosition){
    x.classList.add('third-block-appear');
  }
}

function ScrollAppear4(){
  var x = document.querySelector('.fourth-block');
  var height = x.getBoundingClientRect().top;
  var screenPosition = window.innerHeight/2;

  if (height < screenPosition){
    x.classList.add('fourth-block-appear');
  }
}
window.addEventListener('scroll',ScrollAppear);
window.addEventListener('scroll',ScrollAppear2);
window.addEventListener('scroll',ScrollAppear3);
window.addEventListener('scroll',ScrollAppear4);
