const NumberOfPages = 2;
var currentPos = 0;
var currentPage = 1;
var myFunctionString = new Array();

function AdvancedCalController(){
	$( "div#advancedCalc div#advancedNumberPad input#aNavLeft" ).click(function() {
		$("div#advancedCalc div#advancedNumberPad .page" + currentPage).hide();
		if (currentPage == 1){
			currentPage = NumberOfPages;
		} else {
			currentPage--;
		}
		$("div#advancedCalc div#advancedNumberPad .page" + currentPage).show();
	});
	
	$( "div#advancedCalc div#advancedNumberPad input#aNavRight" ).click(function() {
		$("div#advancedCalc div#advancedNumberPad .page" + currentPage).hide();
		if (currentPage == NumberOfPages){
			currentPage = 1;
		} else {
			currentPage++;
		}
		$("div#advancedCalc div#advancedNumberPad .page" + currentPage).show();
	});
	
	$( "div#advancedCalc div#advancedNumberPad input.mathBut" ).click(function() {
		var CountFuncString = myFunctionString.length;
		currentPos++;	
		switch ($(this).attr('id')){
			case 'AButton_sqr':				
				myFunctionString.splice(currentPos,0,'sqr');
				braces();
				break;
			case 'AButton_reciproc':			
				myFunctionString.splice(currentPos,0,'reciproc');
				braces();
				break;
			case 'AButton_cube':				
				myFunctionString.splice(currentPos,0,'cube');
				braces();
				break;
			case 'AButton_exp':			
				myFunctionString.splice(currentPos,0,'^');
				braces();
				break;
			case 'AButton_log':				
				myFunctionString.splice(currentPos,0,'log');
				braces();
				break;
			case 'AButton_ln':				
				myFunctionString.splice(currentPos,0,'ln');
				braces();
				break;
			case 'AButton_fact':				
				myFunctionString.splice(currentPos,0,'fact');
				braces();
				break;
			case 'AButton_cos':			
				myFunctionString.splice(currentPos,0,'cos');
				braces();
				break;
			case 'AButton_tan':			
				myFunctionString.splice(currentPos,0,'tan');
				braces();
				break;
			case 'AButton_sin':				
				myFunctionString.splice(currentPos,0,'sin');
				braces();
				break;
			case 'AButton_cosh':				
				myFunctionString.splice(currentPos,0,'cosh');
				braces();
				break;
			case 'AButton_sinh':				
				myFunctionString.splice(currentPos,0,'sinh');
				braces();
				break;
			case 'AButton_tanh':				
				myFunctionString.splice(currentPos,0,'tanh');
				braces();
				break;
			case 'AButton_sqrt':				
				myFunctionString.splice(currentPos,0,'sqrt');
				braces();
				break;
			case 'AButton_log':				
				myFunctionString.splice(currentPos,0,'log');
				braces();
				break;
			case 'AButton_ln':				
				myFunctionString.splice(currentPos,0,'ln');
				braces();
				break;
			case 'AButton_Mod':				
				myFunctionString.splice(currentPos,0,'mod');
				break;
			case 'AButton_nCr':				
				myFunctionString.splice(currentPos,0,'nCr');
				break;
			case 'AButton_nPr':				
				myFunctionString.splice(currentPos,0,'nPr');
				break;
			case 'AButton_xroot':
				myFunctionString.splice(currentPos,0,'xroot');
				//braces();
				break;
			case 'AButton_Pi':
				myFunctionString.splice(currentPos,0,Math.PI);
				break;
			case 'AButton_Clear':
				myFunctionString = new Array();
				currentPos = 0;
				$( "div#advancedCalc div#advancedDisplay input.result" ).val("");
				break;
			default:
				myFunctionString.splice(currentPos,0,$(this).val());
				break;
		}
		if (currentPos == myFunctionString.length) {
			currentPos--;
			if (myFunctionString[currentPos] == ')') {
				currentPos--;
			}
		} else {
			if (myFunctionString[currentPos] == ')') {
				currentPos--;
			}
			//currentPos ++;
			// if (myFunctionString.length - CountFuncString > 2){
				// currentPos ++;
			// }
		}
		if(myFunctionString.indexOf('&nbsp;') >= 0) {
			myFunctionString.splice(myFunctionString.indexOf('&nbsp;'),1);
		}
		printAdvancedFormular();
	});
	$( "div#advancedCalc div#advancedNumberPad input.navigation" ).click(function() {
		if ($(this).hasClass("left")) {
			if (currentPos > 0){
				currentPos -=1;
			} else {
				if (myFunctionString[currentPos] != "&nbsp;") {
					myFunctionString.unshift("&nbsp;");
				}
			}
		} else {
			if (currentPos < myFunctionString.length-1){
				currentPos +=1;
			}
		}
		printAdvancedFormular();
	});
	$( "div#advancedCalc div#advancedNumberPad input#AButton_DEL" ).click(function() {
		myFunctionString.splice(currentPos,1);
		if (currentPos >= myFunctionString.length){
			if(myFunctionString.length > 0){
				currentPos = myFunctionString.length-1;	
			}
		} else {
			if(currentPos!=0){
				currentPos--;
			}
		}
		printAdvancedFormular();
	});
	
	$( "div#advancedCalc div#advancedNumberPad input#AButton_Equals" ).click(function() {
		if(myFunctionString.indexOf('&nbsp;') >= 0) {
			myFunctionString.splice(myFunctionString.indexOf('&nbsp;'),1);
		}
		var result = AdvancedCalculate();
		$( "div#advancedCalc div#advancedDisplay input.result" ).val(result);	
	});
}

function AdvancedCalculate(){
	var result = ErrorMsg;
	var funcAsString = myFunctionString.toString();
	var openBraces = funcAsString.split("(");
	var closeBraces = funcAsString.split(")");
	if (openBraces.length == closeBraces.length) {
		if (myFunctionString.indexOf(')') < 0){
			var OperationArray = findAllMathOps(myFunctionString);
			console.log("before REs: " + result);
			result = calculateMathOp(myFunctionString,OperationArray);
			console.log("after REs: " + result);
		} else {
			var newFuncSt = myFunctionString.slice(0);
			console.log("Start: " + myFunctionString.length);
			result = CalcInnerBraces(newFuncSt);
		}
	}
	console.log("return REs: " + result);
	return result;
}

function calculateMathOp(func,OperationArray){
	var lastOp = -1;
	var ResultAfterPointOp = new Array();
	var result = "";
	console.log("para func: " + func.toString());
	console.log("op array: " + OperationArray.toString());
	console.log("op array length: " + OperationArray.length);
	//if (func[func.length - 1] == ")") { func.pop();}
	$.each( OperationArray, function( key, value ) {
		console.log("operation: " + value[0]);
		console.log("last OPIndex: " + lastOp);
		if (value[0] == '*' || value[0] == '/' || value[0] == 'xroot' || value[0] == 'mod' || value[0] == 'nCr' || value[0] == 'nPr') {
			var firstVal = "";
			var secondVal = "";
			var secEnd = "";
			for(i = value[1]-1; i >= lastOp+1; i--){
				firstVal = func[i] + firstVal;
			}
			console.log("key: " + key);
			console.log( " | length: " + (OperationArray.length-1));
			//console.log("key: " + key + " | length: " + OperationArray.length-1);
			if(key < (OperationArray.length-1)) {
				secEnd = OperationArray[key+1][1]-1;
			} else {
				secEnd = func.length-1;				
			}			
			//console.log("real end: " + secEnd + " | Should end: " + OperationArray[key+1][1]);
			for(i = value[1]+1; i <= secEnd; i++){
				secondVal += func[i];
			}
			console.log("f V: " + firstVal + "| sec V: " + secondVal);
			ResultAfterPointOp.push(mathOperation(firstVal, secondVal, value[0]));
			lastOp=value[1];
		} else {
				if ( (func[lastOp] != '/' && func[lastOp] != '*')) {
					var firstVal = "";
					for(i = value[1]-1; i >= lastOp+1; i--){
						firstVal = func[i] + firstVal;
					}
					if (firstVal != "") {
						ResultAfterPointOp.push(firstVal);
					}
				}
				ResultAfterPointOp.push(value[0]);
				if (key == OperationArray.length -1) {
					var secondVal = "";
					for(i = value[1]+1; i <= func.length -1; i++){
						secondVal += func[i];
					}
					if (secondVal != "") {
						ResultAfterPointOp.push(secondVal);
					}
				}
			lastOp = value[1];
		}
		console.log("RAPO String: " + ResultAfterPointOp.toString());
	});
	if (ResultAfterPointOp.length <= 2) {
		// check percent
		console.log(ResultAfterPointOp.toString());
		if (ResultAfterPointOp[0] == "-") {
			ResultAfterPointOp.shift();
			result = -1 * ResultAfterPointOp.shift();
		} else {
			if(ResultAfterPointOp.length > 0){
				result = ResultAfterPointOp.shift();
			}
		}
	} else {
		if (ResultAfterPointOp.length > 0) {
			result = ResultAfterPointOp.shift();
			while (ResultAfterPointOp.length > 0){
				Op = ResultAfterPointOp.shift();
				NoTwo = ResultAfterPointOp.shift();
				console.log("NoTwo before call: " + result);
				if (Op == "-" && typeof NoTwo  === 'undefined'){
					result = mathOperation(result, -1, '*');
				} else {
					result = mathOperation(result, NoTwo, Op);
				}
			}
		}
	}
	return result;
}

function findClosingBrace(funcArray, startPoint){
	var index = 0, openBraces= 1, closeBrace = 0;
	var NewFunc = new Array();
	for(index = startPoint + 1; index<funcArray.length -1 ; index++){
		if (funcArray[index] == '('){
			openBraces++;
		}
		if (funcArray[index] == ')'){
			closeBrace++;
		}
		NewFunc.push(funcArray[index]);
		if (openBraces != 0 && openBraces == closeBrace){
			break;
		}		
	}
	return NewFunc;
}

function CalcInnerBraces(func){
	var braceResult = 0;
	var result = false;
	var InnerArray= new Array();
	if (func.length <= 0) {
		braceResult = ErrorMsg;
	} else {
		if (func.indexOf('(') >= 0) {
			while( func.indexOf('(') >= 0){
				InnerArray = findClosingBrace(func, func.indexOf('('));
				var startInnerBrace = func.indexOf('(') - 1;
				var lengthInnerBrace = InnerArray.length + 2;
				//result = CalcInnerBraces(InnerArray);
				if (func[func.indexOf('(') - 1] == '^') {
					var number = "";
					var index = func.indexOf('(') - 2;
					while (index >= 0 && !isNaN(func[index])){
						//console.log("i: " + index);
						number = func[index] + number;
						index--;
					}
					console.log("BExp: " + number);
					console.log("EExp: " + result);
					result = mathFunction('^', new Array(number, CalcInnerBraces(InnerArray)));
					func.splice(index + 1, lengthInnerBrace + number.length + 1 , result);
					//newFuncSt
				} else {
					// calc with func
					var InnerBracRes = CalcInnerBraces(InnerArray);
					result = mathFunction(func[func.indexOf('(') - 1],InnerBracRes);
					// clac rest of braces
					console.log("Before inner sp: " + func.toString());
					var additional = 0;
					if (func[startInnerBrace+lengthInnerBrace] == ')') {
						additional=1;
					}
					console.log("res Before inner sp: " + result);
					if (result === false){
						if(!isNaN(func[func.indexOf('(') - 1])){
							func.splice(startInnerBrace+1,0,"*");
							startInnerBrace++;
							//console.log("after times: " + func.toString());
						} 
						func.splice(startInnerBrace+1, lengthInnerBrace-1 + additional, InnerBracRes);
					} else {
						func.splice(startInnerBrace, lengthInnerBrace + additional, result);
					}
					console.log("after inner sp: " + func.toString());
				}
			}
			
			//console.log("Start: " + func[func.indexOf('(') - 1] + " | Length: " + innerBrace.length);
			
			
			var OperationArray = findAllMathOps(func);
			
			//if (OperationArray[0].length == 0 && OperationArray[1].length == 0 && OperationArray[2].length == 0 && OperationArray[3].length == 0) {
			if(OperationArray.length == 0){
				result = parseFloat(func.toString().replace(",",""));
			} else {
				var paraFunc = new Array();
				
				result = calculateMathOp(func,OperationArray);
			}
			return result;
			//console.log("result inner: " + result);
			//console.log("before: " + func.toString());
			//console.log("after: " + func.toString());
		}
	}
	var OperationArray = findAllMathOps(func);
	//if (OperationArray[0].length == 0 && OperationArray[1].length == 0 && OperationArray[2].length == 0 && OperationArray[3].length == 0) {
	if(OperationArray.length == 0){
		console.log("Only numb: " + func.toString());
		braceResult = func.toString().replace(/,/g,"");
		braceResult = braceResult.replace(/\)/g,"");
		if(isNaN(braceResult)){
			braceResult.replace('%','');
			braceResult = mathOperation(parseFloat(braceResult), 100, '/');
		}
		console.log("after repl: " + braceResult);
	} else {
		console.log("HEREWEGO: " + func.toString());
		var paraFunc = new Array();
		paraFunc = func.splice(0);
		if (paraFunc[paraFunc.length - 1] == ')') { paraFunc.pop(); }
		braceResult = calculateMathOp(paraFunc,OperationArray);
	}
	return braceResult;
}

function findAllMathOps(func){
	var idnex=0;
	var OpArray = new Array();
	//console.log("Func String:" + func.toString());
	for(index = 0; index<func.length ; index++){
		if (func[index] == '*'){
			//Times.push(index);
			OpArray.push(new Array('*', index));
		}
		if (func[index] == '-'){
			//Minus.push(index);
			OpArray.push(new Array('-', index));
		}
		if (func[index] == '+'){
			//Plus.push(index);
			OpArray.push(new Array('+', index));
		}
		if (func[index] == '/'){
			//Div.push(index);
			OpArray.push(new Array('/', index));
		}
		if (func[index] == 'mod') {
			OpArray.push(new Array('mod', index));
		}
		if (func[index] == 'nCr') {
			OpArray.push(new Array('nCr', index));
		}
		if (func[index] == 'nPr') {
			OpArray.push(new Array('nPr', index));
		}
		if (func[index] == 'xroot') {
			OpArray.push(new Array('xroot', index));
		}
	}
	return OpArray;
}

function braces(){
	currentPos++;
	myFunctionString.splice(currentPos,0,'(');
	currentPos++;
	myFunctionString.splice(currentPos,0,')');
	//currentPos--;
}

function printAdvancedFormular(){
	var DisplayString = "";
	for(i = 0; i<myFunctionString.length; i++) {
		DisplayString += '<span class="DigNo' + i + ' Digigts">' + myFunctionString[i] + '</span>';
	}
	$( "div#advancedCalc div#advancedDisplay div.formula" ).html(DisplayString);
	if (myFunctionString.length > 0) {
		$("div#advancedCalc div#advancedDisplay div.formula span.DigNo" + currentPos).addClass("active");
	}
}