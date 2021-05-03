// var button = document.getElementsByClassName('edit-btn');
// var box = document.getElementsByClassName('post-click');
//
// for(var i=0;i<button.length;i++){
//
//   button[i].addEventListener("click", function(){
//     box[0].classList.toggle('post-click-edit');
//   });
// }  // ye change krna hai abhi
//
//
// var search = document.querySelector('.search-bar');
// var search_icon = document.querySelector('#search-icon');
//
// search.addEventListener("focus", function(){
//
//   search_icon.style.opacity = 1;
// });
//
// var signout = document.querySelector('.fa-sign-out-alt');
// var signouttext =document.querySelector('.signout-text');
// signout.addEventListener("mouseenter",function(){
//   signouttext.classList.add('signout-visible');
// });
//
// var signout = document.querySelector('.fa-sign-out-alt');
// var signouttext =document.querySelector('.signout-text');
// signout.addEventListener("mouseleave",function(){
//   signouttext.classList.remove('signout-visible');
// });
//
// var camera = document.querySelector(".fa-camera");
// camera.addEventListener("click",function(){
//   document.querySelector(".bg-photo-input").style.display="flex";
//   document.querySelector("*").style.overflow="hidden";
// });
//
// var close = document.querySelector(".fa-window-close");
// close.addEventListener("click",function(){
//   document.querySelector(".bg-photo-input").style.display="none";
//   document.querySelector("*").style.overflow="initial";
// });
// 
// var imageinp = document.querySelector(".user-img-input");
// var display = document.querySelector(".img-display");
// var image = document.querySelector(".img-display-img");
// var defaulttxt = document.querySelector(".default-txt");
//
// imageinp.addEventListener("change",function(){
//   const file = this.files[0];
//
//   if(file){
//     const reader = new FileReader();
//     defaulttxt.style.display="none";
//     image.style.display="block";
//
//     reader.addEventListener("load",function(){
//       image.setAttribute("src", this.result);
//
//     });
//
//     reader.readAsDataURL(file);
//   }
// });
//
//
//
// var createpost = document.querySelector("#create-post");
// createpost.addEventListener("click",function(){
//   document.querySelector(".bg-photo-post").style.display="flex";
//   document.querySelector("*").style.overflow="hidden";
// });
//
// var closepost = document.querySelector("#closepost");
// closepost.addEventListener("click",function(){
//   document.querySelector(".bg-photo-post").style.display="none";
//   document.querySelector("*").style.overflow="initial";
// });




var checkbox = document.querySelector("#check-box");
checkbox.addEventListener("click",function(){

  if(this.checked){
    setTimeout(function(){
      document.querySelector(".toggle_section_dropdown_content").style.display="block";
    },500);

  }

  else{
    setTimeout(function(){
      document.querySelector(".toggle_section_dropdown_content").style.display="none";
    },500);
  }
});


var dropdown = document.querySelector(".dropdown_button");
dropdown.addEventListener("focus",function(){
  setTimeout(function(){
    document.querySelector(".dropdown_content").style.display="block";
  },200);


});

document.querySelector(".dropdown").addEventListener("mouseleave",function(){


  setTimeout(function(){
    document.querySelector(".dropdown_content").style.display="none";
  },300);


});


var imagepostinp = document.querySelector(".user-img-post");
imagepostinp.addEventListener("change",function(){
  document.querySelector(".photo_div").style.display="flex";


  const file = this.files[0];

  if(file){
    const reader = new FileReader();

    reader.addEventListener("load",function(){
      document.querySelector(".photo-post").setAttribute("src", this.result);

    });

    reader.readAsDataURL(file);
  }

});

/*  FOR COMMENTS
let form=document.querySelector("#myForm");
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
*/

/*
let upvote=document.querySelector("#upvote");
let pid=upvote.value;

function upVote(){

fetch('/upVote?pid='+pid)
.then(response=>response.json())
.then((data)=>{

if(data.error){
return console.log(data.error);
}
console.log("Successfully upvoted",data);
})
}

function downVote(){

fetch('/downVote?pid='+pid)
.then(response=>response.json())
.then((data)=>{

if(data.error){
return console.log(data.error);
}
console.log("Successfully downvoted",data);
})
}

*/




document.querySelector(".fa-times").addEventListener("click",function(){
  document.querySelector(".photo_div").style.display="none";
  document.querySelector(".photo-post").setAttribute("src", "");
});
