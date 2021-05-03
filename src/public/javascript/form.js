$(".branch").click(function(e){
  var branch = $(this).text();
  $(".dropdown_one_button").val(branch);
});

var genre ="";

$(".checkbox").click(function(e){

  if($(this).prop("checked")== true){
  genre = genre+$(this).parent().text() + " ";
  $(".dropdown_two_button").val(genre);
  }


  else if($(this).prop("checked")== false){
    var newgenre = genre.split(" ");
    console.log(newgenre);
    for(var i=0;i<newgenre.length; i++){
      if (newgenre[i] ==  $(this).parent().text()){
        newgenre.splice(i,1);
        console.log(newgenre);
      }
    }
    var temp= "";
    for(var i=0; i<newgenre.length-1;i++){
      temp = temp + newgenre[i] + " ";
    }
    genre = temp;

    $(".dropdown_two_button").val(temp);

  }
});
