const AFTERFLOATDIGITS = 50;

function mathFunction(operation,number){
	var result = 0;
	if (isNaN(number) && Array.isArray(number) == false){
		number.replace('%','');
		number = mathOperation(parseFloat(number), 100, '/');
	}
	//consoloe.log("Math func: " + );
	//number = number.toString();
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
			break;
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
	console.log("No: " + numberOne + " |Two: " + numberTwo);
	if (isNaN(NoO)) {
		NoO.replace('%','');
		NoO = mathOperation(parseFloat(NoO), 100, '/');
	} else {
		// NoO = parseFloat(numberOne);
	}
	if (isNaN(NoT)) {
		NoT.replace('%','');
		NoT = mathOperation(parseFloat(NoT), 100, '/');
	} else {
		// NoT = parseFloat(numberTwo);
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
		return parseInt(numberOne) + parseInt(numberTwo);
	}
}

function Minus(numberOne, numberTwo){
	var NOPointIndex = numberOne.toString().indexOf(".");
	var NTPointIndex = numberTwo.toString().indexOf(".");
	console.log("Func Minus: " + numberOne + " " + numberTwo );
	if (NOPointIndex >= 0 || NTPointIndex >= 0){
		var sLFloats = makeFloatsSameLength(numberOne, NOPointIndex, numberTwo, NTPointIndex);
		return subFloats(sLFloats[0],sLFloats[1]);
		//return "Komma: " + sLFloats[0] + " |" + sLFloats[1];
	} else {
		return parseInt(numberOne) - parseInt(numberTwo);
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
		return parseInt(numberOne) * parseInt(numberTwo);
	}
}

function Divide(numberOne, numberTwo){
	var result = "Error";
	var NOPointIndex = numberOne.toString().indexOf(".");
	var NTPointIndex = numberTwo.toString().indexOf(".");
	var isOneNeg = false;
	var isTwoNeg = false;
	if (numberTwo != 0) {
		if (numberOne.toString().indexOf("-") >= 0) {
			isOneNeg = true;
			numberOne = numberOne.toString().replace("-","");
			NOPointIndex = numberOne.toString().indexOf(".");
		}
		if (numberTwo.toString().indexOf("-") >= 0) {
			isTwoNeg = true;
			numberTwo = numberTwo.toString().replace("-","");
			NTPointIndex = numberTwo.toString().indexOf(".");
		}
		var sLFloats = makeFloatsSameLength(numberOne, NOPointIndex, numberTwo, NTPointIndex);
		console.log("OneNo: " + numberOne + " |OneInd: " + NOPointIndex + " |TwoNo: " + numberTwo + " |TwoInd: " + NTPointIndex);
		console.log("O: " + sLFloats[0] + " |Two: " + sLFloats[1]);
		result = exactDivision(sLFloats[0],sLFloats[1]);
		if ((isOneNeg == false && isTwoNeg==true ) ||  (isOneNeg == true && isTwoNeg==false ) ){
			result = "-" + result;
		}
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
	var NOPointIndex = number.toString().indexOf(".");
	if (NOPointIndex >= 0){
		var sLFloats = makeFloatsSameLength(number, NOPointIndex, number, NOPointIndex);
		return timesFloats(sLFloats[0],sLFloats[1]);
	} else {
		return parseInt(number)*parseInt(number);
	}
}

function cube(number){
	var NOPointIndex = number.toString().indexOf(".");
	if (NOPointIndex >= 0){
		var sLFloats = makeFloatsSameLength(number, NOPointIndex, number, NOPointIndex);
		var tempRes = timesFloats(sLFloats[0],sLFloats[1]);
		console.log("temp:" + tempRes);
		sLFloats = makeFloatsSameLength( tempRes, tempRes.toString().indexOf("."), number, NOPointIndex);
		console.log("sfl1:" + sLFloats[0]);
		console.log("sfl2:" + sLFloats[1]);
		return timesFloats(sLFloats[0],sLFloats[1]);
	} else {
		return number*number*number;
	}
}

function reciproc(number){
	if (number == 0){
		return ErrorMsg;
	} else {
		return 1/number;
	}
}

function sqrt(number){
	if(number >= 0) {
		return Math.sqrt(number);
	} else {
		return ErrorMsg;
	}
}

function fact(number){
	var result = 1;
	if (number >= 0){
		if (number.toString().indexOf('.') >= 0){
			//var gamma = require('gamma');
			result = number*gamma(number);
			if (isNaN(result)){
				result = ErrorMsg;
			}
		} else {		
			for(run = 1; run <= number; run++){
				result *= run;
			}
		}
	} else {
		result = ErrorMsg;
	}
	return result;
}

function exponential(number){
	// Math.pow
	//
	console.log("base: " + number[0] +" |Exp" + number[1]);
	if (number[1].toString().indexOf('-') >= 0){
		//number[1] = number[1].toString().replace("-","1/");
	}
	//return Math.pow(-0.45, -12);
	return Math.pow(parseFloat(number[0]), number[1]);
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
	console.log("Start sub: "+ NoO + " | " + NoT );
	//Maybe String Comapre
	if (parseFloat(NoO) < 0){
		NoO = NoO.replace("-","");
		result = addFloats(NoO,NoT);
		ChangePrefix = true;
	} else {
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
			//console.log("res" + result);
		}
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
	var isOneNeg = false;
	var isTwoNeg = true;
	if (Two.indexOf(".") >= 0) {
		var IndexOfPoint = Two.length - Two.indexOf(".") - 1;
		Two = Two.replace(".","");
		One = One.replace(".","");
		
		if (One.length <= Two.length){
		
		} else {
			One = One.substr(0,Two.length) + "." +  One.substr(Two.length + 1);
		}
	}
	if(One.indexOf(".") >= 0 && Two.length > One.indexOf(".")){
		var numberOfZeros = Two.length - One.indexOf(".");
		result = ".";
		for ( i = 0; i < numberOfZeros; i++){
			result = result + "0";
		}
	}
	var actIndex = 0;
	var PointIndex = One.indexOf(".");
	var count = 0;
	var Part= "";
	One = One.replace(".");
	if(One.length < Two.length ){
		//var NumberOfZeros = (One.length - 1 - actIndex) - (Two.length - 1);
		var DiffLength = Two.length - One.length;
		Part = One;
		result = "0.";
		for (i = 0; i < DiffLength; i++){
			Part = Part + "0";
			count++;
			if (i > 0) {
				result = result + "0";
			}
		}
	} else {
		Part = One.substr(0,Two.length);
	}
	actIndex = Part.length -1;
	
	do{
		if (parseInt(Part) >= parseInt(Two)) {
			var Times = 1;
			while(parseInt(Two) * Times <= parseInt(Part)){
				Times++;
			}
			Times--;
			result = result + "" + Times;
			Part = parseInt(Part) - (parseInt(Two) * Times);
			actIndex++;
		} else {
			result = result + "0";
			actIndex++;
		}
		if(actIndex <= One.length-1){
			Part = Part + One.charAt(actIndex);
		} else {
			Part = Part + "0";
		}
		if (Part == 0 && actIndex > One.length-1){
			break;
		}
		if(actIndex == One.length){
			result += ".";
		}
		if(actIndex > One.length){
			count++;
		}
	} while(count < AFTERFLOATDIGITS);
	
	//return One + " " + Two + " " + (NoT.length - NoT.indexOf(".") - 1) + " |res: " + result;
	return parseFloat(result);
}

function makeFloatsSameLength(numberOne, NOPointIndex, numberTwo, NTPointIndex){
	var One = numberOne.toString();
	var Two = numberTwo.toString();
	var addPoint = false;
	var IndexOfPoint;
	var OneNeg = false;
	var TwoNeg = false;
	if(One.indexOf(".") == 0){
		One = "0"+One;
		NOPointIndex++;
	}
	if(Two.indexOf(".") == 0){
		Two = "0"+Two;
		NTPointIndex++;
	}
	if(One.indexOf("-") == 0){
		OneNeg= true;
		One = One.replace("-","");
		NOPointIndex--;
	}
	if(Two.indexOf("-") == 0){
		TwoNeg= true;
		Two = Two.replace("-","");
		NTPointIndex--;
	}
	if (One.indexOf(".") < 0 && Two.indexOf(".") >= 0){
		One = One+ ".";
		NOPointIndex = One.length -1;
	}
	if (NOPointIndex > NTPointIndex) {
		if (NTPointIndex < 0) {
			NTPointIndex = Two.length;
			addPoint = true;
		}
		for(i = NOPointIndex-NTPointIndex; i>0;i--){
			Two = "0"+Two;
		}
		console.log("two: " + Two );
		if(addPoint){
			Two += ".";
		}
		IndexOfPoint=NOPointIndex;
	} else if(NTPointIndex >= 0){
		if (NOPointIndex < 0) {
			NOPointIndex = One.length;
			addPoint = true;
		} else {
			for(i = NTPointIndex-NOPointIndex; i>0;i--){
				One = "0"+One;
			}
		}
		if(addPoint){
			One += ".";
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
	if (OneNeg){
		One = "-" + One;
	}
	if (TwoNeg){
		Two = "-" + Two;
	}
	return new Array(One, Two);
}