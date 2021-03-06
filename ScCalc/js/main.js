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
	$("div#page").wipetouch({
	  tapToClick: false, // if user taps the screen, triggers a click event
	  preventDefault: false,
	  wipeLeft: function(result) { changeMenu(0); },
	  wipeRight: function(result) { changeMenu(1); }  
	});
	makeFontSize();
	$( "div#page" ).click(function() {
	});
}

function changeMenu(direction){
	var newDate = new Date();
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
	makeFontSize();
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
	//var heightEle = $("div#Menu div.menupoint").height();
	//$("div#Menu div.menupoint").width(heightEle);
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

function makeFontSize(){
	$("div#easyCalc div#easyCalDisplay").css({'font-size':  $("div#easyCalc div#easyCalDisplay").height() + 'px'});
	$("div#easyCalc input").each(function( index ) {
		var size = $(this).height() - (parseFloat($(this).css("border-top-width").replace("px","")) + parseFloat($(this).css("border-bottom-width").replace("px","")));
		if($(this).height() > $(this).width()){
			size = $(this).width()- (parseFloat($(this).css("border-left-width").replace("px","")) + parseFloat($(this).css("border-right-width").replace("px","")));
			size /= $(this).val().length;
		}	
		$(this).css({'font-size': size + "px"});
	});
	$("div#advancedCalc input").each(function( index ) {
		var size = $(this).height() - (parseFloat($(this).css("border-top-width").replace("px","")) + parseFloat($(this).css("border-bottom-width").replace("px","")));
		if($(this).height() > $(this).width()){
			size = $(this).width()- (parseFloat($(this).css("border-left-width").replace("px","")) + parseFloat($(this).css("border-right-width").replace("px","")));
			size /= $(this).val().length;
		}	
		$(this).css({'font-size': size + "px"});
	});
	EasyCalcFontSize();
}

function PrepareClac(){
	lastButton = "";
	activeOperation ="";
	lastNumber = "";
	memory = "";
	$( "input#easyCalDisplay" ).html("0");
}

$( document ).ready(function() {
// Handler for .ready() called.
	PrepareClac();
	displayCorrections();
	buttonFunctionality();
	makeFontSize();
});