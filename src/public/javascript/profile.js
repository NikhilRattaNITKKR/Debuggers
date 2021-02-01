var button = document.querySelector('.edit-btn');
var box = document.querySelector('.post-click');
button.addEventListener("click", function(){
  box.classList.toggle('post-click-edit');
});

var search = document.querySelector('.search-bar');
var search_icon = document.querySelector('#search-icon');

search.addEventListener("focus", function(){

    search_icon.style.opacity = 1;
});
