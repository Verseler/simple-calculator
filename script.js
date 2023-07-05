
const OPERATORS = ['÷', '×', '+', '−'];
const DEFAULT_VALUE = '0';
const totalResult = document.getElementById('total-amount');
let expression = ''; //expression value during js computation
const expressionDisplay = document.getElementById('expression'); //expression value displayed in the GUI

//set expression when button is clicked in the calculator
const buttons = document.getElementsByClassName('button');
Array.from(buttons).forEach(button => {
    button.addEventListener('click', () => {
        let buttonValue = button.innerText;

        if (buttonValue === 'CLEAR') {
            expression = clearAllChar(expression);
        }
        else if (buttonValue === 'DELETE') {
            expression = deleteLastChar(expression);
        }
        else {
            //else the button value is either number or an operator
            expression = addToTheExpression(buttonValue, expression);
        }

        //then update the old expression value displayed in calculator with new expression value
        updateExpression(expression);
    });
});


/* FUNCTIONS FOR EXPRESSION */
//delete the last character of the expression
function deleteLastChar(oldExpression) {
    return (oldExpression.slice(-1) === " ") ? oldExpression.slice(0, -3) : oldExpression.slice(0, -1);
}

//delete all characters in the expression
function clearAllChar(expression) {
    clearTotalAmount()
    return expression.innerText = DEFAULT_VALUE;
}

//add the button value to the expression
function addToTheExpression(value, oldExpression) {
    let operator = oldExpression + " " + value + " ";
    let number = oldExpression + value;
    //add value to the expression if it is an operator or a number
    return (OPERATORS.includes(value)) ? operator : number;
}

// update the displayed expression in the calculator
function updateExpression(newExpression) {
    //update expression
    expression = newExpression;
    //update expression display in the calculator GUI
    expressionDisplay.innerText = expression;
}

//compute the current given expression
function getEqual() {
    CURRENT_NUM_ARRAY = expression.split(' ');
    console.log(CURRENT_NUM_ARRAY);
    findFirstSetOfNums();
}

/* find the FIRST set of numbers that will be computed based on bidmas rule */
function findFirstSetOfNums() {
    //first loop will execute the inner loop based on the current operator
    OPERATORS.forEach((operator) => {
        //second loop will check if current operator exist in the currentNumArr array
        while (CURRENT_NUM_ARRAY.includes(operator)) {
            //get the set of numbers to be computed based on the currentOperatorIndex
            let currentOperatorIndex = CURRENT_NUM_ARRAY.indexOf(operator);
            operate(currentOperatorIndex);
        }
    });
}

function operate(operatorIndex) {
    const currentSetOfNums = [];
    let setOfNumsStartingIndex = operatorIndex - 1;
    let setOfNumsEndingIndex = operatorIndex + 2;

    //Set the selected set of numbers that to be computed
    for (let i = setOfNumsStartingIndex; i !== setOfNumsEndingIndex; i++) {
        currentSetOfNums.push(CURRENT_NUM_ARRAY[i]);
    }
    let [firstNum, operator, secondNum] = currentSetOfNums;
    let operationResult = compute(firstNum, operator, secondNum);
    //update the currentNumArray with computed results of the selected set of numbers
    CURRENT_NUM_ARRAY.splice(setOfNumsStartingIndex, 3, `${operationResult}`);

    let totalResult = Number(CURRENT_NUM_ARRAY[0]);
    updateTotalAmount(totalResult);
    console.log(CURRENT_NUM_ARRAY); //!!!!temporary for debugging
}


/* caculate numbers based on the given operator */
function compute(firstNum, operator, secondNum) {
    console.log('compute');
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

function updateTotalAmount(results) {
    let totalResultValue = Number(totalResult.innerText) + results;
    totalResult.innerText = totalResultValue;

    //update expressionDisplay
    updateExpression(totalResultValue);
}


function clearTotalAmount() {
    totalResult.innerText = DEFAULT_VALUE;
}



window.onload = () => {
    clearTotalAmount(DEFAULT_VALUE)
    updateExpression(DEFAULT_VALUE);
}

