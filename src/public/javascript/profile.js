var button = document.getElementsByClassName('edit-btn');
var box = document.getElementsByClassName('post-click');

for(var i=0;i<button.length;i++){

  button[i].addEventListener("click", function(){
  box[0].classList.toggle('post-click-edit');
  });
}  // ye change krna hai abhi


var search = document.querySelector('.search-bar');
var search_icon = document.querySelector('#search-icon');

search.addEventListener("focus", function(){

    search_icon.style.opacity = 1;
});

var signout = document.querySelector('.fa-sign-out-alt');
var signouttext =document.querySelector('.signout-text');
signout.addEventListener("mouseenter",function(){
  signouttext.classList.add('signout-visible');
});

var signout = document.querySelector('.fa-sign-out-alt');
var signouttext =document.querySelector('.signout-text');
signout.addEventListener("mouseleave",function(){
  signouttext.classList.remove('signout-visible');
});

var camera = document.querySelector(".fa-camera");
camera.addEventListener("click",function(){
  document.querySelector(".bg-photo-input").style.display="flex";
  document.querySelector("*").style.overflow="hidden";
});

var close = document.querySelector(".fa-window-close");
close.addEventListener("click",function(){
  document.querySelector(".bg-photo-input").style.display="none";
  document.querySelector("*").style.overflow="initial";
});

var imageinp = document.querySelector(".user-img-input");
var display = document.querySelector(".img-display");
var image = document.querySelector(".img-display-img");
var defaulttxt = document.querySelector(".default-txt");

imageinp.addEventListener("change",function(){
  const file = this.files[0];

  if(file){
    const reader = new FileReader();
    defaulttxt.style.display="none";
    image.style.display="block";

    reader.addEventListener("load",function(){
      image.setAttribute("src", this.result);

    });

    reader.readAsDataURL(file);
  }
});
