var button = document.querySelector('.edit-btn');
var box = document.querySelector('.post-click');
button.addEventListener("click", function(){
  box.classList.toggle('post-click-edit');
});
