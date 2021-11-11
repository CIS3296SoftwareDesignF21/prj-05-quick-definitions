document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("dictionary_com").addEventListener("click", handler);
  document.getElementById("thesaurus_com").addEventListener("click", handler);
  //console.log("event listeners added");
});

// The handler also must go in a .js file
function handler(event){
	//console.log(event);
	//console.log("clicked!");
	var selected = document.getElementById("selectedButton");
	//console.log(selected.id);
	var target = event.target;
	//console.log("here1");
    var clickedEle = event.target.id ;
	//console.log(clickedEle);
    var ele = document.getElementById(clickedEle);
	//console.log(ele);
	//console.log(ele.innerHTML);
	selected.innerHTML = "Selected: " + ele.innerHTML;
	//console.log("here2");
}	