function mathFunction(operation,number){
	var result = 0;
	if (isNaN(number) && Array.isArray(number) == false){
		number.replace('%','');
		number = mathOperation(parseFloat(number), 100, '/');
	}
	switch (operation) {
		case 'sqr':
			result = sqr(number);
			break;
		case 'cube':
			result = cube(number);
			break;
		case 'reciproc':
			result = reciproc(number);
			break;
		case 'sqrt':
			result = sqrt(number);
			break;
		case 'fact':
			result = fact(number);
			break;
		case '^':
			result = exponential(number);
			break;
		case 'cos':
			result = cos(number);
			break;
		case 'sin':
			result = sin(number);
			break;
		case 'tan':
			result = tan(number);
		case 'cosh':
			result = cosh(number);
			break;
		case 'sinh':
			result = sinh(number);
			break;
		case 'tanh':
			result = tanh(number);
			break;
		case 'ln':
			result = ln(number);
			break;
		case 'log':
			result = log(number);
			break;
		default:
			result = false;
			break;
	}
	return result;
}

function mathOperation(numberOne, numberTwo, Operation){
	var result = 0;
	var NoO = numberOne;
	var NoT = numberTwo;
	//console.log("No: " + numberOne);
	if (isNaN(NoO)) {
		NoO.replace('%','');
		NoO = mathOperation(parseFloat(NoO), 100, '/');
	} else {
		NoO = parseFloat(numberOne);
	}
	if (isNaN(NoT)) {
		NoT.replace('%','');
		NoT = mathOperation(parseFloat(NoT), 100, '/');
	} else {
		NoT = parseFloat(numberTwo);
	}
	console.log("No: " + NoO + "\ Nt: " + NoT);
	switch (Operation) {
		case "+": 
			result = Plus(NoO, NoT);
			break;
		case "-":
			result = Minus(NoO, NoT);
			break;
		case "*":
			result = Times(NoO, NoT);
			break;
		case "/":
			result = Divide(NoO, NoT);
			break;
		case "mod":
			result = Modulo(NoO, NoT);
			break;
		case "nCr":
			result = nCr(NoO, NoT);
			break;
		case "nPr":
			result = nPr(NoO, NoT);
			break;
		case "xroot":
			result = xRoot(NoO, NoT);
			break;
	}
	return result;
}

function Plus(numberOne, numberTwo){
	var NOPointIndex = numberOne.toString().indexOf(".");
	var NTPointIndex = numberTwo.toString().indexOf(".");
	if (NOPointIndex >= 0 || NTPointIndex >= 0){
		var sLFloats = makeFloatsSameLength(numberOne, NOPointIndex, numberTwo, NTPointIndex);
		return addFloats(sLFloats[0],sLFloats[1]);
		//return "Komma: " + sLFloats[0] + " |" + sLFloats[1];
	} else {
		return numberOne + numberTwo;
	}
}

function Minus(numberOne, numberTwo){
	var NOPointIndex = numberOne.toString().indexOf(".");
	var NTPointIndex = numberTwo.toString().indexOf(".");
	if (NOPointIndex >= 0 || NTPointIndex >= 0){
		var sLFloats = makeFloatsSameLength(numberOne, NOPointIndex, numberTwo, NTPointIndex);
		return subFloats(sLFloats[0],sLFloats[1]);
		//return "Komma: " + sLFloats[0] + " |" + sLFloats[1];
	} else {
		return numberOne - numberTwo;
	}
}

function Times(numberOne, numberTwo){
	var NOPointIndex = numberOne.toString().indexOf(".");
	var NTPointIndex = numberTwo.toString().indexOf(".");
	if (NOPointIndex >= 0 || NTPointIndex >= 0){
		var sLFloats = makeFloatsSameLength(numberOne, NOPointIndex, numberTwo, NTPointIndex);
		return timesFloats(sLFloats[0],sLFloats[1]);
		//return "Komma: " + sLFloats[0] + " |" + sLFloats[1];
	} else {
		return numberOne * numberTwo;
	}
}

function Divide(numberOne, numberTwo){
	var result = "Error";
	var NOPointIndex = numberOne.toString().indexOf(".");
	var NTPointIndex = numberTwo.toString().indexOf(".");
	if (numberTwo != 0) {
		var sLFloats = makeFloatsSameLength(numberOne, NOPointIndex, numberTwo, NTPointIndex);
		result = exactDivision(sLFloats[0],sLFloats[1]);
		//result = numberOne / numberTwo;
	}
	return result;
}

function Modulo(numberOne, numberTwo){
	return numberOne%numberTwo;
}

function nCr(numberOne, numberTwo){
	// TODO IF Fact eroor
	return (fact(numberOne))/(fact(numberTwo)*fact(numberOne-numberTwo));
}

function nPr(numberOne, numberTwo){
	// TODO IF Fact eroor
	return (fact(numberOne))/(fact(numberOne-numberTwo));
}

function xRoot(numberOne, numberTwo){
	return Math.pow(numberOne, 1/numberTwo);
}

function sqr(number){
	return number*number;
}

function cube(number){
	return number*number*number;
}

function reciproc(number){
	if (number == 0){
		return ErrorMsg;
	} else {
		return 1/number;
	}
}

function sqrt(number){
	return Math.sqrt(number);
}

function fact(number){
	var result = 1;
	if (number >= 0){
		for(run = 1; run <= number; run++){
			result *= run;
		}
	} else {
		result = ErrorMsg;
	}
	return result;
}

function exponential(number){
	// Math.pow
	return Math.pow(number[0], number[1]);
}

function cos(number){
	return Math.cos(number);
}

function tan(number){
	return Math.tan(number);
}

function sin(number){
	return Math.sin(number);
}
function cosh(number){
	var myTerm1 = Math.pow(Math.E, number);
	var myTerm2 = Math.pow(Math.E, -number);
   
	return (myTerm1+myTerm2)/2;
}

function tanh(number){
	return sinh(number)/cosh(number);
}

function sinh(number){
	var myTerm1 = Math.pow(Math.E, number);
	var myTerm2 = Math.pow(Math.E, -number);
   
	return (myTerm1-myTerm2)/2;
}

function ln(number){
	return Math.log(number);
}

function log(number){
	return  Math.log(number) / Math.log(10);
}

function subFloats(NoO,NoT){
	var rest = 0;
	var result = "";
	var ChangePrefix = false;
	//Maybe String Comapre
	if(parseFloat(NoT) > parseFloat(NoO)){
		var temp = NoT;
		NoT = NoO;
		NoO= temp;
		ChangePrefix = true;
	}
	for(i = NoO.length-1;i>=0;i--){
		if (NoO.charAt(i) != ".") {
			if (NoO.charAt(i) >= (parseInt(NoT.charAt(i)) + rest)){
				//console.log("Sub: " + NoO.charAt(i) + " - " + NoT.charAt(i));
				result = (NoO.charAt(i) -(parseInt(NoT.charAt(i)) + rest) ) + result;
				rest = 0;
			} else {
				//console.log("zw. step: (" + "10 + " +  parseInt(NoO.charAt(i)).toString() + ") - (" +  parseInt(NoT.charAt(i)).toString() + " + " + rest + ")"  );
				//console.log("zw.: " +  parseInt((10 + parseInt(NoO.charAt(i))) - (parseInt(NoT.charAt(i)) + rest) ).toString());
				result = parseInt((10 + parseInt(NoO.charAt(i))) - (parseInt(NoT.charAt(i)) + rest) ).toString() + result;
				rest = 1;
			}
		} else {
			result = "."+ result;
		}
		console.log("res" + result);
	}
	if (ChangePrefix == true){
		result = "-" + result;
	}
	return parseFloat(result);
}

function addFloats(NoO,NoT){
	var rest = 0;
	var result = "";
	console.log("addfloats!" + rest);
	for(i = NoO.length-1;i>=0;i--){
		if (NoO.charAt(i) != ".") {
			var extension = parseInt(NoO.charAt(i)) + parseInt(NoT.charAt(i)) + parseInt(rest);
			if(extension.toString().length > 1){
				rest = extension.toString().charAt(0);
				result = extension.toString().charAt(1) + result;
			} else {
				result = extension + result;
				rest = 0;
			}
			console.log("rest" + rest);
		} else {
			result = "."+ result;
		}
	}
	if (rest > 0) {
		result = rest+result;
	}
	return parseFloat(result);
}

function timesFloats(NoO,NoT){
	var result = "";
	var Divident = "1";
	var IndexOfPoint = NoT.length - NoT.indexOf(".") - 1;
	var One = NoO.replace(".","");
	var Two = NoT.replace(".","");
	result = parseInt(One) * parseInt(Two);
	for (i=0;i<IndexOfPoint;i++){
		Divident += "00";
	}
	
	//return IndexOfPoint + " leng: " + NoT.length + " | index: " + NoT.indexOf(".") + " | Divident: " + Divident + " | res: " + result + " | No1: " + One; //
	return result/parseInt(Divident);
}

function exactDivision(NoO, NoT){
	var result = "";
	var One = NoO;
	var Two = NoT;
	console.log("ind: " + Two.indexOf("."));
	if (Two.indexOf(".") >= 0) {
		var IndexOfPoint = NoT.length - NoT.indexOf(".") - 1;
		Two = NoT.replace(".","");
		One = NoO.replace(".","");
		One = One.substr(0,Two.length) + "." +  One.substr(Two.length + 1);
	}
	return One + " " + Two + " " + (NoT.length - NoT.indexOf(".") - 1);
	return One;
}

function makeFloatsSameLength(numberOne, NOPointIndex, numberTwo, NTPointIndex){
	var One = numberOne.toString();
	var Two = numberTwo.toString();
	var IndexOfPoint;
	if (NOPointIndex > NTPointIndex) {
		for(i = NOPointIndex-NTPointIndex; i>0;i--){
			Two = "0"+Two;
		}
		IndexOfPoint=NOPointIndex;
	} else {
		for(i = NTPointIndex-NOPointIndex; i>0;i--){
			One = "0"+One;
		}
		IndexOfPoint=NTPointIndex;
	}
	if(One.length - IndexOfPoint > Two.length - IndexOfPoint){
		for(i = (One.length - IndexOfPoint)-(Two.length - IndexOfPoint); i>0;i--){
			Two = Two+"0";
		}
	} else {
		for(i = (Two.length - IndexOfPoint) - (One.length - IndexOfPoint); i>0;i--){
			One = One+"0";
		}
	}
	return new Array(One, Two);
}