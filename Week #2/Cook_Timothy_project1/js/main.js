/*	main.js
	Timothy Cook
	Project 2
	VFW Full Sail
*/

window.addEventListener("DOMContentLoaded", function(){
	
	
	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	function pickColor() {
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "colors");
		for (var i=0, j=selectColor.length; i<j; i++) {
			var makeOption = document.createElement('option');
			var optText = selectColor[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	var selectColor = ["--Choose A Color--", "Black", "White", "Silver", "Red", "Blue", "Yellow", "Green"];
	pickColor();
	
	/*
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);
	*/
});





