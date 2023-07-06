const OPERATORS = ['÷', '×', '+', '−'];
const WHITESPACE = ' ';
const DEFAULT_VALUE = '0';
const NO_VALUE = '';
const resultOutput = document.getElementById('result'); //result displayed in the GUI
let result = NO_VALUE; //result variable during js computation


//set result when clicked a button in the calculator GUI
const buttons = document.getElementsByClassName('button');
Array.from(buttons).forEach(button => {
    button.addEventListener('click', () => {
        let buttonValue = button.innerText;

        if (buttonValue === 'CLEAR') {
            result = (result.innerText = DEFAULT_VALUE);
        }
        else if (buttonValue === 'DELETE') {
            result = (result.slice(-1) === " ") ? result.slice(0, -3) : result.slice(0, -1);
        }
        else {
            //else the button value is either number or an operator
            result = addToTheResult(buttonValue, result);
        }

        //then update the old result displayed in calculator with new result
        updateResult(result);
    });
});


//add the button value to the result
function addToTheResult(value, oldResult) {
    //if the current value is an operator and the previous value is also an operator 
    //except minus operator because it can use as a negative sign
    //prevent adding two or more operator in a series in the result output      
    if(value !== '−' && OPERATORS.includes(value) && oldResult.slice(-1) === WHITESPACE) {
        return oldResult;
    }
    //remove the default value zero when enter a number or operator
    if(oldResult === '0' || oldResult === 'INVALID' || oldResult === 'NaN' || oldResult === 'Infinity') {
        oldResult = NO_VALUE;
    }

    //if the value is an operator add a space around the operator
    return (OPERATORS.includes(value)) ? `${oldResult} ${value} ` : oldResult + value;
}

//update the displayed result output in the calculator GUI
function updateResult(newResult) {
    result = newResult;
    //update result output that is displayed in the calculator GUI
    resultOutput.innerText = result;
}




/* find the FIRST set of numbers that will be computed based on bidmas rule */
function getEqual() {
    let expressionIsValid = true; 
    //remove spaces in the result then add all characters to CURRENT_RESULT array
    CURRENT_RESULT = result.split(WHITESPACE);
    console.log(CURRENT_RESULT); //for debug purposes

    //first loop will execute the inner loop based on the current operator
    //so it compute first the divison, then multiplication, add, and subtract operator based on bidmas rule
    OPERATORS.forEach((operator) => {
        //second loop will check if current operator exist in the CURRENT_RESULT array
        //if not proceed to the next operator if yes compute that set of numbers with the current operator
        while (CURRENT_RESULT.includes(operator)) {
            //get the set of numbers to be computed based on the currentOperatorIndex
            let operatorIndex = CURRENT_RESULT.indexOf(operator);
            let currentFirstNum = Number(CURRENT_RESULT[operatorIndex - 1]);
            let currentOperator = CURRENT_RESULT[operatorIndex];
            let currentSecondNum = Number(CURRENT_RESULT[operatorIndex + 1]);
        
            //verify if set of numbers and operator are valid
            if(!OPERATORS.includes(currentOperator) && 
                !currentFirstNum % 1 < 1 && !currentFirstNum % 1 > -1 &&
                !currentSecondNum % 1 < 1 && !currentSecondNum % 1 > -1) {
                expressionIsValid = false;
                break;
            }
            else {
                //update the CURRENT_RESULT with computed results of the selected set of numbers
                let operationResult = calculate(currentFirstNum, currentOperator, currentSecondNum);
                CURRENT_RESULT.splice(operatorIndex - 1, 3, `${operationResult}`);
            }
        }
    });

    //update all expression the result is computed display the totalResult
    let totalResult;
    if(!expressionIsValid) {
       totalResult = 'INVALID';
    }
    else {
        totalResult = CURRENT_RESULT[0].toString();
    }
    updateResult(totalResult);
    console.log(CURRENT_RESULT); //for debugging purposes
}



/* caculate two numbers based on the given operator */
function calculate(currentFirstNum, operator, currentSecondNum) {

    switch (operator) {
        case '÷':
            return currentFirstNum / currentSecondNum;
        case '×':
            return currentFirstNum * currentSecondNum;
        case '+':
            return currentFirstNum + currentSecondNum;
        case '−':
            return currentFirstNum - currentSecondNum;
        default:
            console.log('invalid operator');
    }
}


window.onload = () => {
    updateResult(DEFAULT_VALUE);
}

