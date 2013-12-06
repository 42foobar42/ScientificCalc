/***
*
*
***/
const ErrorMsg = "Error";
var menus = new Array("_easyCalc_","_advancedCalc_");

function buttonFunctionality(){
	EasyCalController();
	AdvancedCalController();
	/**** wipe Events*****/
	// $( "div#Menu" ).on( "swipe", swipeHandler );
	// Callback function references the event target and adds the 'swipe' class to it
	// function swipeHandler( event ){
		// $( event.target ).addClass( "swipe" );
	// }
	$("div#Menu").wipetouch({
	  tapToClick: true, // if user taps the screen, triggers a click event
	  wipeLeft: function(result) { changeMenu(0); },
	  wipeRight: function(result) { changeMenu(1); }
	});
		
	$( "div#Menu div.menupoint" ).click(function() {
		var clickedMenu = $(this).attr('id');
		//var index = menus.indexOf(clickedMenu);
		$('div#Menu div.menupoint').removeClass('active');
		$('div#Menu div#'+ clickedMenu).addClass("active");
		$('div#page div.Calculator').removeClass('active');
		$('div#page div#'+ clickedMenu.replace(/_/g,"")).addClass('active');
		
	});
	
}

function changeMenu(direction){
	var id = $('div#Menu div.menupoint.active').attr('id');
	var index = menus.indexOf(id);
	var newId = "";
	if (direction == 0 ){
		if (index == 0) {
			newId = menus[menus.length - 1]
		} else {
			newId = menus[index-1]
		}
	} else {
		if (index == menus.length - 1) {
			newId = menus[0]
		} else {
			newId = menus[index+1]
		}
	}
	$('div#Menu div#'+ id).removeClass("active");
	$('div#Menu div#'+ newId).addClass("active");
	$('div#page div#'+ id.replace(/_/g,"")).removeClass("active");
	$('div#page div#'+ newId.replace(/_/g,"")).addClass("active");	
}

function isErrorInLastOperation(){
	var result = false;
	if ($( "div#easyCalc input#easyCalDisplay" ).val() == ErrorMsg ) {
		$( "div#easyCalc input#easyCalDisplay" ).val("0");
		lastButton = "";
		activeOperation = "";
		lastNumber = "";
		result = true;
	}
	return result;
}

function displayCorrections(){
	var heightEle = $("div#Menu div.menupoint").height();
	$("div#Menu div.menupoint").width(heightEle);
}

function isButtonOperation(Button){
	var result = false;
	if (Button == "/"){
		result = true;
	}
	if (Button == "+"){
		result = true;
	}
	if (Button == "*"){
		result = true;
	}
	if (Button == "-"){
		result = true;
	}
	return result;
}

function PrepareClac(){
	lastButton = "";
	activeOperation ="";
	lastNumber = "";
	memory = "";
	$( "input#easyCalDisplay" ).val("0");
}

$( document ).ready(function() {
// Handler for .ready() called.
	//alert("THIS JQ");
	PrepareClac();
	displayCorrections();
	buttonFunctionality();
});