const OPERATORS = ['÷', '×', '+', '−'];
const DEFAULT_VALUE = '0';
const resultOutput = document.getElementById('result'); //result displayed in the GUI
let result = ''; //result variable during js computation


//set result when clicked a button in the calculator GUI
const buttons = document.getElementsByClassName('button');
Array.from(buttons).forEach(button => {
    button.addEventListener('click', () => {
        let buttonValue = button.innerText;

        if (buttonValue === 'CLEAR') {
            result = clearAllResult(result);
        }
        else if (buttonValue === 'DELETE') {
            result = popResult(result);
        }
        else {
            //else the button value is either number or an operator
            result = addToTheResult(buttonValue, result);
        }

        //then update the old result displayed in calculator with new result
        updateResult(result);
    });
});


//delete the last character in the result
function popResult(oldResult) {
    return (oldResult.slice(-1) === " ") ? oldResult.slice(0, -3) : oldResult.slice(0, -1);
}

//delete all characters in the result
function clearAllResult(result) {
    return result.innerText = DEFAULT_VALUE;
}

//add the button value to the result
function addToTheResult(value, oldResult) {
    //remove the defaul value zero when enter a number or operator
    if(oldResult === '0') {
        oldResult = "";
    }

    //if the value is an operator add a space around the operator
    return (OPERATORS.includes(value)) ? `${oldResult} ${value} ` : oldResult + value;
}

//update the displayed result output in the calculator GUI
function updateResult(newResult) {
    result = newResult;
    //update result output that is displayed in the calculator GUI
    resultOutput.innerText = result;

    //adjust the result output size depend on its size
    let resultSize = resultOutput.innerText.length;
    if(resultSize >= 15) {
        resultOutput.style.fontSize = '1.5rem';
        resultOutput.style.bottom = '5px';
    }
    else {
        resultOutput.style.fontSize = '2.5rem';
        resultOutput.style.bottom = '20px';
    }
}


/* find the FIRST set of numbers that will be computed based on bidmas rule */
function getEqual() {
    //remove spaces in the result then add all characters to CURRENT_RESULT array
    CURRENT_RESULT = result.split(' ');
    console.log(CURRENT_RESULT); //for debug purposes

    //first loop will execute the inner loop based on the current operator
    //so it compute first the divison, then multiplication, add, and subtract operator based on bidmas rule
    OPERATORS.forEach((operator) => {
        //second loop will check if current operator exist in the CURRENT_RESULT array
        //if not proceed to the next operator if yes compute that set of numbers with the current operator
        while (CURRENT_RESULT.includes(operator)) {
            //get the set of numbers to be computed based on the currentOperatorIndex
            let currentSetOfExpressionOperatorIndex = CURRENT_RESULT.indexOf(operator);
            compute(currentSetOfExpressionOperatorIndex, CURRENT_RESULT);
        }
    });

    //update all expression the result is computed display the totalResult
    let totalResult = CURRENT_RESULT[0].toString();
    updateResult(totalResult);
    console.log(CURRENT_RESULT); //for debugging purposes
}

//set the first set of numbers to be computed based on bidmas rule
function compute(operatorIndex) {
    const CURRENT_SET_OF_EXPRESSION = [];
    let setOfExpressionStartingIndex = operatorIndex - 1;
    let setOfExpressionEndingIndex = operatorIndex + 2;

    //Set the selected set of numbers that to be computed
    for (let indx = setOfExpressionStartingIndex; indx !== setOfExpressionEndingIndex; indx++) {
        CURRENT_SET_OF_EXPRESSION.push(CURRENT_RESULT[indx]);
    }
    let [firstNum, operator, secondNum] = CURRENT_SET_OF_EXPRESSION;
    //calculate the first and second number with its operator of the current set of expression
    let operationResult = calculate(firstNum, operator, secondNum);
    //update the CURRENT_RESULT with computed results of the selected set of numbers
    CURRENT_RESULT.splice(setOfExpressionStartingIndex, 3, `${operationResult}`);
}


/* caculate two numbers based on the given operator */
function calculate(firstNum, operator, secondNum) {
    firstNum = Number(firstNum);
    secondNum = Number(secondNum);

    switch (operator) {
        case '÷':
            return firstNum / secondNum;
        case '×':
            return firstNum * secondNum;
        case '+':
            return firstNum + secondNum;
        case '−':
            return firstNum - secondNum;
        default:
            console.log('invalid operator');
    }
}


window.onload = () => {
    updateResult(DEFAULT_VALUE);
}

