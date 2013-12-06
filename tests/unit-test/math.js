var ErrorMsg = "Error";

test("basic arithmetics", function () {
	var Problem = new Array("5+5", "3.45+2.78", "0.1+0.2", "0.1+0.04", "12.4+5.07", "3412.578+9.00007","9.00007+3412.578", "5.5+5.5", 
							"7-3", "5-5", "55-250", "3.5-2.6", "456.789-456.789", "40.563-41.345", "7.6-3.2", "2.01-3.1","3.1-2.01",
							"5*6", "5*0", "2.5*3.4", "0.1*0.2", "7.4325*234.768", "364567*9876987",
							"8/4","9/0","45/45","4/8","456.789/456.789", "7/16", "45.95/25");
	var solution = new Array(10, 6.23, 0.3, 0.14, 17.47, 3421.57807,3421.57807, 11, 
							4, 0, -195, 0.9, 0, -0.782, 4.4, -1.09, 1.09,
							30, 0, 8.5, 0.02, 1744.91316, 3600823519629,
							2, ErrorMsg, 1, 0.5, 1, 0.4375, 1.838);
	$.each( Problem, function( key, value ) {
		pushToArray(value);
		var IsResult = AdvancedCalculate();
		var ShouldResult = solution[key];
		ok(IsResult == ShouldResult, value + " = " + IsResult + " === " + ShouldResult);
	});
});
test("function", function () {
	var BraceFunctions = new Array("cube", "sqr", "sqrt", "reciproc");
	var TestNumbers = new Array(-1000, -535.78, -14, -0.678, 0.1, 0, 0.23456, 1, 25, 324.689, 1278);
	var Results = new Array(
					new Array(-1000000000, -153801118.456552,  -2744, -0.311665752, 0.001, 0,  0.012905114402816, 1, 15625, 34229671.147894769 , 2087336952),
					new Array(1000000, 287060.2084, 196, 0.459684, 0.01, 0, 0.0550183936, 1, 625, 105422.946721, 1633284 ),
					new Array(ErrorMsg, ErrorMsg, ErrorMsg, ErrorMsg, 0.3162277660168379331998893544432718533719555139325216,0, 0.48431394776528996 ,1, 5, 18.01912872477468 , 35.749125863438955 ),
					new Array(-0.001, -0.0018664377169733846, -0.07142857142857142, -1.4749262536873156 , 10, ErrorMsg, 4.263301500682128 , 1, 0.04, 0.0030798702758639803, 0.000782472613458529 )
				  );
	$.each( BraceFunctions, function( key, value ) {
		var func = value;
		var indexOfFunc = key;
		$.each( TestNumbers, function( key, value ) {
			pushToArray("");
			addFunc(func);
			addToArray("(" + value + ")");
			IsResult = AdvancedCalculate();
			Expected = Results[indexOfFunc][key];
			ok(IsResult == Expected, "function: " + func + "(" + value + ")= " + IsResult + " === " + Expected);
		});
	});
	
});
function pushToArray(string){
	myFunctionString = [];
	for(i = 0; i < string.length; i++){
		myFunctionString.push(string.charAt(i));
	}
}

function addToArray(string){
	for(i = 0; i < string.length; i++){
		myFunctionString.push(string.charAt(i));
	}
}

function addFunc(string){
	myFunctionString.push(string);
}
