var lastButton = "";
var activeOperation = "";
var lastNumber = "";
var memory = "";

function EasyCalController(){
	$( "div#easyCalc input.numBut" ).click(function() {
		isErrorInLastOperation();
		if ($( "div#easyCalc input#easyCalDisplay" ).val() == '0' ) {
			$( "div#easyCalc input#easyCalDisplay" ).val("");
			lastButton =$(this).val();
		}
		if ($.isNumeric(lastButton) == false && lastButton != "."){
			lastNumber = $( "div#easyCalc input#easyCalDisplay" ).val();
			$( "div#easyCalc input#easyCalDisplay" ).val("");
		}
		if ($( "div#easyCalc input#easyCalDisplay" ).val().length <= 15) {
			$( "div#easyCalc input#easyCalDisplay" ).val( $( "div#easyCalc input#easyCalDisplay" ).val() + $(this).val());
			lastButton = $(this).val();	
		}
	});
	$( "div#easyCalc input.mathOp" ).click(function() {
		if (isButtonOperation(lastButton) == false) {
			if (activeOperation != "" && lastNumber != "") {
				$( "div#easyCalc input#easyCalDisplay" ).val( mathOperation(lastNumber,$( "div#easyCalc input#easyCalDisplay" ).val(), activeOperation));
			}
			activeOperation = $(this).val();
			lastButton = $(this).val();
		}
	});
	$( "div#easyCalc input#Button_C" ).click(function() {
		$( "div#easyCalc input#easyCalDisplay" ).val("0");
		lastButton = "";
		activeOperation = "";
		lastNumber = "";
	});
	$( "div#easyCalc input#Button_Dot" ).click(function() {
		isErrorInLastOperation();
		if (lastButton == activeOperation){
			lastNumber = $( "div#easyCalc input#easyCalDisplay" ).val();
			$( "div#easyCalc input#easyCalDisplay" ).val( "0" + $(this).val());
			lastButton = $(this).val();
		}
		else if ($( "div#easyCalc input#easyCalDisplay" ).val().indexOf('.') == -1 ) {
			$( "div#easyCalc input#easyCalDisplay" ).val( $( "div#easyCalc input#easyCalDisplay" ).val() + $(this).val());
			lastButton = $(this).val();
		}
	});
	$( "div#easyCalc input#Button_Equals" ).click(function() {
		if (activeOperation != "" && lastNumber != "" && $( "div#easyCalc input#easyCalDisplay" ).val() != "") {
			$( "div#easyCalc input#easyCalDisplay" ).val( mathOperation(lastNumber,$( "div#easyCalc input#easyCalDisplay" ).val(), activeOperation));
		}
		activeOperation = "";
		lastNumber = $( "div#easyCalc input#easyCalDisplay" ).val();
		lastButton = $(this).val();
	});
	$( "div#easyCalc input#Button_Bs" ).click(function() {
		if ($.isNumeric(lastButton)){
			if($( "div#easyCalc input#easyCalDisplay" ).val().length > 1) {
				$( "div#easyCalc input#easyCalDisplay" ).val($( "div#easyCalc input#easyCalDisplay" ).val().substring(0,$( "div#easyCalc input#easyCalDisplay" ).val().length-1));
			} else {
				$( "div#easyCalc input#easyCalDisplay" ).val("0");
			}
		}
		if (isButtonOperation(lastButton)){
			activeOperation=""
			lastButton=$(this).val();
		}	
	});
	$( "div#easyCalc input#Button_Sign" ).click(function() {
		//if($.isNumeric(lastButton)) {
			if ($( "div#easyCalc input#easyCalDisplay" ).val().indexOf('-') == -1 ) {
				$( "div#easyCalc input#easyCalDisplay" ).val("-" + $( "div#easyCalc input#easyCalDisplay" ).val());
			} else {
				$( "div#easyCalc input#easyCalDisplay" ).val($( "div#easyCalc input#easyCalDisplay" ).val().replace("-",""));
			}
		//}
	});
	$( "div#easyCalc input.memBut" ).click(function() {
		switch ($(this).val()){
			case 'MC':
				memory = "";
				break;
			case 'M+':
				if (isErrorInLastOperation() == false && memory!= "") {
					$( "div#easyCalc input#easyCalDisplay" ).val( mathOperation($( "div#easyCalc input#easyCalDisplay" ).val(), memory, "+"));
					// TODO ???
					lastButton = "";
					lastNumber = $( "input#easyCalDisplay" ).val();
				}
				break;
			case 'M-':
				if (isErrorInLastOperation() == false && memory!= "") {
					$( "div#easyCalc input#easyCalDisplay" ).val( mathOperation($( "div#easyCalc input#easyCalDisplay" ).val(), memory, "-"));
					lastButton = "";
					lastNumber = $( "div#easyCalc input#easyCalDisplay" ).val();
				}
				break;
			case 'MR':				
				if (memory != ""){
					$( "div#easyCalc input#easyCalDisplay" ).val(memory);
				}
				break;
			case 'MS':
				if (isErrorInLastOperation() == false) {
					memory = $( "div#easyCalc input#easyCalDisplay" ).val();
				}
				break;
		}
	});
}