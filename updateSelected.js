document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("dictionary_com").addEventListener("click", handler);
  document.getElementById("thesaurus_com").addEventListener("click", handler);
  //console.log("event listeners added");
});

// The handler also must go in a .js file
function handler(event){
	var selected = document.getElementById("selectedButton");
	var target = event.target;
    var clickedEle = event.target.id ;
    var ele = document.getElementById(clickedEle);
	selected.innerHTML = "Selected: " + ele.innerHTML;
}	