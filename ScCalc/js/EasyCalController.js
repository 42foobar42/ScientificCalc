var lastButton = "";
var activeOperation = "";
var lastNumber = "";
var memory = "";

function EasyCalController(){
	
	$( "div#easyCalc input.numBut" ).click(function() {
		//$("div#easyCalc div#easyCalDisplay").css({'font-size':  $("div#easyCalc div#easyCalDisplay").height() + 'px'});
		isErrorInLastOperation();
		if ($( "div#easyCalc div#easyCalDisplay" ).html() == '0' ) {
			$( "div#easyCalc div#easyCalDisplay" ).html("");
			lastButton =$(this).val();
		}
		if ($.isNumeric(lastButton) == false && lastButton != "."){
			lastNumber = $( "div#easyCalc div#easyCalDisplay" ).html();
			$( "div#easyCalc div#easyCalDisplay" ).html("");
		}
		if ($( "div#easyCalc div#easyCalDisplay" ).html().length <= 15) {
			$( "div#easyCalc div#easyCalDisplay" ).html( $( "div#easyCalc div#easyCalDisplay" ).html() + $(this).val());
			lastButton = $(this).val();	
		}
	});
	$( "div#easyCalc input.mathOp" ).click(function() {
		if (isButtonOperation(lastButton) == false) {
			if (activeOperation != "" && lastNumber != "") {
				//var OperationArray = findAllMathOps(lastNumber.toString() + activeOperation + $( "div#easyCalc div#easyCalDisplay" ).html());
				//var result = calculateMathOp(myFunctionString,OperationArray);
				//$( "div#easyCalc div#easyCalDisplay" ).html(CalcInnerBraces(lastNumber.toString() + activeOperation + $( "div#easyCalc div#easyCalDisplay" ).html()));
				$( "div#easyCalc div#easyCalDisplay" ).html( mathOperation(lastNumber.toString(),$( "div#easyCalc div#easyCalDisplay" ).html().toString(), activeOperation));
			}
			activeOperation = $(this).val();
			lastButton = $(this).val();
		}
	});
	$( "div#easyCalc input#Button_C" ).click(function() {
		$( "div#easyCalc div#easyCalDisplay" ).html("0");
		lastButton = "";
		activeOperation = "";
		lastNumber = "";
	});
	$( "div#easyCalc input#Button_Dot" ).click(function() {
		isErrorInLastOperation();
		if (lastButton == activeOperation){
			lastNumber = $( "div#easyCalc div#easyCalDisplay" ).html();
			$( "div#easyCalc div#easyCalDisplay" ).html( "0" + $(this).val());
			lastButton = $(this).val();
		}
		else if ($( "div#easyCalc div#easyCalDisplay" ).html().indexOf('.') == -1 ) {
			$( "div#easyCalc div#easyCalDisplay" ).html( $( "div#easyCalc div#easyCalDisplay" ).html() + $(this).val());
			lastButton = $(this).val();
		}
	});
	$( "div#easyCalc input#Button_Equals" ).click(function() {
		// $("div#easyCalc div#easyCalDisplay").css({'font-size':  $("div#easyCalc div#easyCalDisplay").height() + 'px'});
		if (activeOperation != "" && lastNumber != "" && $( "div#easyCalc div#easyCalDisplay" ).html() != "") {
			$( "div#easyCalc div#easyCalDisplay" ).html( mathOperation(lastNumber,$( "div#easyCalc div#easyCalDisplay" ).html(), activeOperation));
		}
		activeOperation = "";
		lastNumber = $( "div#easyCalc div#easyCalDisplay" ).val();
		lastButton = $(this).val();
	});
	$( "div#easyCalc input#Button_Bs" ).click(function() {
		// $("div#easyCalc div#easyCalDisplay").css({'font-size':  $("div#easyCalc div#easyCalDisplay").height() + 'px'});
		if ($.isNumeric(lastButton)){
			console.log("is num");
			if($( "div#easyCalc div#easyCalDisplay" ).html().length > 1) {
				$( "div#easyCalc div#easyCalDisplay" ).html($( "div#easyCalc div#easyCalDisplay" ).html().substring(0,$( "div#easyCalc div#easyCalDisplay" ).html().length-1));
			} else {
				$( "div#easyCalc div#easyCalDisplay" ).html("0");
			}
		}
		if (isButtonOperation(lastButton)){
			activeOperation=""
			lastButton=$(this).val();
		}	
	});
	$( "div#easyCalc input#Button_Sign" ).click(function() {
		// $("div#easyCalc div#easyCalDisplay").css({'font-size':  $("div#easyCalc div#easyCalDisplay").height() + 'px'});
		//if($.isNumeric(lastButton)) {
			if ($( "div#easyCalc div#easyCalDisplay" ).html().indexOf('-') == -1 ) {
				$( "div#easyCalc div#easyCalDisplay" ).html("-" + $( "div#easyCalc div#easyCalDisplay" ).html());
			} else {
				$( "div#easyCalc div#easyCalDisplay" ).html($( "div#easyCalc div#easyCalDisplay" ).html().replace("-",""));
			}
		//}
	});
	$( "div#easyCalc input.memBut" ).click(function() {
		// $("div#easyCalc div#easyCalDisplay").css({'font-size':  $("div#easyCalc div#easyCalDisplay").height() + 'px'});
		switch ($(this).val()){
			case 'MC':
				memory = "";
				break;
			case 'M+':
				if (isErrorInLastOperation() == false && memory!= "") {
					$( "div#easyCalc div#easyCalDisplay" ).html( mathOperation($( "div#easyCalc div#easyCalDisplay" ).html(), memory, "+"));
					// TODO ???
					lastButton = "";
					lastNumber = $( "div#easyCalDisplay" ).html();
				}
				break;
			case 'M-':
				if (isErrorInLastOperation() == false && memory!= "") {
					$( "div#easyCalc div#easyCalDisplay" ).html( mathOperation($( "div#easyCalc div#easyCalDisplay" ).html(), memory, "-"));
					lastButton = "";
					lastNumber = $( "div#easyCalc div#easyCalDisplay" ).val();
				}
				break;
			case 'MR':				
				if (memory != ""){
					$( "div#easyCalc div#easyCalDisplay" ).html(memory);
				}
				break;
			case 'MS':
				if (isErrorInLastOperation() == false) {
					memory = $( "div#easyCalc div#easyCalDisplay" ).html();
				}
				break;
		}
	});
	$( "div#easyCalc input.calcBut" ).click(function() {
		var stringlength = $("div#easyCalc div#easyCalDisplay").html().length;
		var fontsize = ($("div#easyCalc div#easyCalDisplay").width() * 0.95) / stringlength;
		if (fontsize > ($("div#easyCalc div#easyCalDisplay").height() * 0.95)) {
			fontsize = $("div#easyCalc div#easyCalDisplay").height() * 0.95;
		}
		$("div#easyCalc div#easyCalDisplay").css({'font-size': fontsize + 'px'});
	});
}

