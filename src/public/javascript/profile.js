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

let form=document.querySelector("#myForm");
let pid=document.querySelector('#pid')
form.addEventListener('submit',(e)=>{
  e.preventDefault();
//chnage color of button to idicate change
  fetch('/upVote?pid='+pid.value).then((response)=>{
    response.json().then((data)=>{
      if(data.error){
        return console.log(data.error);
      }
      console.log("Successfully upvoted",data);
    })
  })
})


<<<<<<< HEAD



var signoutbtn = document.querySelector('#signOut');
signoutbtn.addEventListener("click",function(){
  alert("hello");
  console.log("Help");
  const cookieName = "www.debuggers.com";
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  location.reload();
});


=======
>>>>>>> 037d375ee2987bb68568970ec798f30d65a1a86e
