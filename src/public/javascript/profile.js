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
