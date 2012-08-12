/*	main.js
	Timothy Cook
	Project 2
	VFW Full Sail
*/
//wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){
	//getElementById Function
	var selectColor = ["--Choose A Color--", "Black", "White", "Silver", "Red", "Blue", "Yellow", "Green"],
		conditionValue,
		holdValues
	;
	
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	//Create select field element and populate with options.
	function pickColor(selectColor){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('select');
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "colors");
		for (var i=0, j=selectColor.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = selectColor[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	

	// Find value of selected radio button.

	function getSelectedRadio(){
		var radios = document.forms[0].condition;
		for (var i=0; i<radios.length; i++){
			if(radios[i].checked){
				var conditionValue = radios[i].value;
			}
		}
		return conditionValue;
	}
	function getCheckboxValue(){
		var checkboxes = document.forms[0].days;
		var holdValues = [];
		for (var i=0, j=checkboxes.length; i<j; i++){
			if(checkboxes[i].checked){ 
				var checkedValue = checkboxes[i].value;
				holdValues.push(checkedValue);
			}
		}
		return holdValues;
	}	
	function storeData() {
		var id				= Math.floor(Math.random()*1000000);
		//Gather all form field values and store in an object.
		//Object properties contain array with form label and input values.
		var display = getSelectedRadio();
		var condition = getCheckboxValue();
		var car				= {};
			car.make 		= ["Make:", $('make').value];
			car.model		= ["Model:", $('model').value];
			car.year		= ["Year:", $('year').value];
			car.doors		= ["Number of doors:", $('doors').value];
			car.colors 		= ["Color:", $('colors').value];
			car.display		= ["What makes it stand out?", display];
			car.condition	= ["What's the condition like?", condition];
			car.discribe	= ["Discribe the car in your own words.", $('discribe').value];
		// Save data to local storage: Use Strinify to convert our object to a sting.
		localStorage.setItem(id, JSON.stringify(car));
		alert("Car Tagged!");
	}
	
	function getData(){
		//Write Data from local storage to the browser.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "cars");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		for (var i=0, len=localStorage.length; i<len; i++){
			var makeLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object.
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for (var n in obj) {
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
			}
		}
	}
		
	//Variable defaults

	pickColor(selectColor);
	getData();
	
	//Set link and submit click events
	
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
/*	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal); */
	var save = document.getElementById('submit');
	save.addEventListener("click", storeData());
});





