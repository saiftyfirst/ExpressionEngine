//Global vars used
var acceptedOps = ['+','-','*','/'];

//Console functions for debugging
// function printOpDict(){
// 	for(var index=0; index<opDictionary.length;index++){
// 		console.log('Dict item ' + index + ': ');
// 		console.log('------Operator: ' + opDictionary[index]['operator']);
// 		console.log('------Position: ' + opDictionary[index]['position']);
// 	}
// }

// function printArray(array){
// 	for(var index=0; index<array.length;index++){
// 		console.log('Operand item ' + index + ': ');
// 		console.log('------Operand: ' + array[index]);
// 	}
// }

//Display Functions
function clearDisplay(){
	$("#display").empty();
}

function equalsDisplay() {
	$("#display").append('<div class="equals">' + "=" + '</div>');
}

function hasPrecedence(operator){
	if(operator=='*' || operator=='/'){
		return true;
	}else {
		return false;
	}
}

function removeLastElement(){
	var elem = 	document.getElementById("display");
	elem.removeChild(elem.lastChild);
}

function operatorDisplay(operator){
	if(operator=='+' || operator=='-'){
		$("#display").append('<div class="operatorAS">' + operator + '</div>');
	}else{
		$("#display").append('<div class="operatorMD">' + operator + '</div>');
	}
}

function numberDisplay(number){
	for(var i=0; i<number.length;i++){
		$("#display").append('<div class="number">' + number[i] + '</div>');
	}
}

//Math
function doMath(operator, num1, num2){
	switch(operator){
		case '/':
			return num1/num2;
			break;
		case '*':
			return num1*num2;
			break;
		case '+':
			return num1+num2;
			break;
		case '-':
			return num1-num2;
			break;
		default:
			break;
	}
}

//Stack Evaluation
function evaluateExpression(evalStack){
	var loops = evalStack.length;
	for(var i=1; i<loops; i+=2){
		valueTemp = doMath(evalStack[i],parseInt(evalStack[i-1]), parseInt(evalStack[i+1]));
		evalStack[i+1] = String(valueTemp);
	}
	return evalStack.pop();
}

//Find the operator postions and store their indices in the opPositions array
function deconstructExpression(expression){
	var strLength = expression.length;
	//Variables to track operands and operators
	var currentOpt = '';
	var currentOpr = '';
	var prevOpt = '';
	var prevOpr = '';
	var lastElement = false;
	var evalStack = [];

	var tempStartPos = 0;
	var expressItem = '';

	//Clear the display from previous computation
	clearDisplay();

	//Find each operand and compute if * or /. Add to stack if - or +
	for(var index=0; index<strLength;index++){
		expressItem = expression.charAt(index);
		lastElement = (index == strLength-1);
		//Check if operator or last item
		if((acceptedOps.includes(expressItem) && index!=0) || lastElement){
			prevOpr = currentOpr;
			prevOpt = currentOpt;
			//Obtain current operator and operand
			currentOpr = expression.substring(tempStartPos, index);
			if(lastElement){
				currentOpr = expression.substring(tempStartPos, );
			}
			currentOpt = expressItem;
			numberDisplay(currentOpr);
			operatorDisplay(currentOpt);
			//Proceed to compute from the second operator onwards
			if(tempStartPos!=0){
				//Do math for the precedence operators
				if(hasPrecedence(prevOpt)){
					currentOpr = String(doMath(prevOpt, prevOpr, currentOpr));
				//Push to stack otherwise
				}else{
					evalStack.push(prevOpr);
					evalStack.push(prevOpt);
				}
				//Special case for last item in expression
				if(lastElement){
					evalStack.push(currentOpr);
					removeLastElement();
				}
			}
			tempStartPos = index+1;
		}
	}
	var result = evaluateExpression(evalStack);
	equalsDisplay();
	numberDisplay(String(result));
}

function handleExpression(){
	//Get Expression from Input
	var expression = $("#expression").val();
	deconstructExpression(expression);

}