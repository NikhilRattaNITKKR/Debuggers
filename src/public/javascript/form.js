$(".branch").click(function(e){
  var branch = $(this).text();
  $(".dropdown_one_button").val(branch);
});

var genre = "";

$(".checkbox").click(function(e){

  genre = genre + $(this).parent().text() + "  ";
  $(".dropdown_two_button").val(genre);
})
