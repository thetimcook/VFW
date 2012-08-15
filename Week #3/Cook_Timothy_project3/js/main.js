/*	main.js
	Timothy Cook
	Project 3
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
		var checkboxes = document.forms[0].display;
		var holdValues = [];
		for (var i=0, j=checkboxes.length; i<j; i++){
			if(checkboxes[i].checked){ 
				var checkedValue = checkboxes[i].value;
				holdValues.push(checkedValue);
			}
		}
		return holdValues;
	}
	
	function toggleControls(n) {
		switch(n) {
			case "on":
				$('headerBar').innerHTML = "Tagged Cars";
				$('carForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('carForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('cars').style.display = "none";		
				break;
			default:
				return false;
			
		}
	}
	
	function storeData(key) {
		if (!key) {
			var id				= Math.floor(Math.random()*1000000);
		} else {
			id = key;
		}
		//Gather all form field values and store in an object.
		//Object properties contain array with form label and input values.
		var condition = getSelectedRadio();
		var display = getCheckboxValue();
		var car				= {};
			car.make 		= ["Make: ", $('make').value];
			car.model		= ["Model: ", $('model').value];
			car.year		= ["Year: ", $('year').value];
			car.doors		= ["Number of doors: ", $('doors').value];
			car.colors 		= ["Color: ", $('colors').value];
			car.display		= ["What makes it stand out? ", display];
			car.condition	= ["Condition: ", condition];
			car.describe	= ["Describe the car in your own words. ", $('describe').value];
		// Save data to local storage: Use Strinify to convert our object to a sting.
		localStorage.setItem(id, JSON.stringify(car));
		alert("Car Tagged!");
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0) {
			alert("There are no cars in your Garage.");
		}
		//Write Data from local storage to the browser.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "cars");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('cars').style.display = "block";		
		for (var i=0, len=localStorage.length; i<len; i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
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
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); //Create edit and delete buttons
		}
	}
	//Create the edit and delete links for each item
	function makeItemLinks(key, linksLi) {
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Car";
		editLink.addEventListener("click", editCar);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Car";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}


	
	function editCar() {
		//Grab the data from our item from local storage
		var value = localStorage.getItem(this.key);
		var car = JSON.parse(value);
		
		//Show the form
		toggleControls("off");
		
		//populate form fields with current values
		$('make').value = car.make[1];
		$('model').value = car.model[1];
		$('year').value = car.year[1];
		$('doors').value = car.doors[1];
		$('colors').value = car.colors[1];

		var checkboxes = document.forms[0].display;
		for (var i=0; i<car.display[1].length; i++) {
			document.getElementById(car.display[1][i]).setAttribute("checked", "checked");
		}
		
		var radios = document.forms[0].condition;
		for (var i=0; i<radios.length; i++) {
			if (radios[i].value == "Amazing" && car.condition[1] == "Amazing"){
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value == "Not so amazing" && car.condition[1] == "Not so amazing") {
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value == "Rubbish" && car.condition[1] == "Rubbish") {
				radios[i].setAttribute("checked", "checked");
			}
		}
		$('describe').value = car.describe[1];
		
		//remove teh listener from input save button.
		save.removeEventListener("click", storeData);
		//Change submit button value to edit button
		$('submit').value = "Edit Car Tag";
		var editSubmit = $('submit');
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	function deleteItem() {
		var ask = confirm("Are you sure you want to delete this car.");
		if (ask) {
			localStorage.removeItem(this.key);
			alert("Car was deleted!");
			window.location.reload();
		} else {
			alert("Car was not deleted!");
		}
	}
	
	function clearLocal() {
		if (localStorage.length === 0) {
			alert("No cars to clear.")
		} else {
			localStorage.clear();
			alert("All cars are deleted!");
			window.location.reload();
			return false;
		}
	}
	
	function validate(e) {
		//Define elements you want to check
		var getMake = $('make');
		var getModel = $('model');
		var getYear = $('year');
		var getColor = $('colors');
		
		//reset error messages
		errMsg.innerHTML = "";
		getMake.style.border = "none";
		getModel.style.border = "none";
		getYear.style.border = "none";
		getColor.style.border = "none";

		//get error messages
		var messageAry  = [];
		//Make Validation
		if (getMake.value === "") {
			var makeError = "Please enter a car make."
			getMake.style.border = "1px solid red";
			messageAry.push(makeError);
		}
		//Model Validation
		if (getModel.value === "") {
			var modelError = "Please enter a car model."
			getModel.style.border = "1px solid red";
			messageAry.push(modelError);
		}
		//Year Validation
		var re = /^\d{4}$/;
		if (!re.exec(getYear.value)) {
			var yearError = "Please enter a valid year.";
			getYear.style.border = "1px solid red";
			messageAry.push(yearError);
		}
		//Color Validation
		if (getColor=="--Choose A Color--") {
			var colorError = "Please choose a color.";
			getColor.style.border = "1px solid red";
			messageAry.push(colorError);
		}
		//If there are errors display them.
		if (messageAry.length >= 1) {
			for (var i=0, j=messageAry.length; i < j; i++) {
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		} else {
			//if all is ok save data
			storeData(this.key);
		}

	}
	//Variable defaults
	var errMsg = $('errors');
	pickColor(selectColor);
	
	//Set link and submit click events
	
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = document.getElementById('submit');
	save.addEventListener("click", validate);
});





