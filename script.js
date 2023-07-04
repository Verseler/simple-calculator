    let currentUserInput = '7 + 1 + 3 * 3 / 1 / 2';
    let totalResult = 0;
    const CURRENT_NUM_ARRAY = currentUserInput.split(' ');
    const OPERATORS = ['/', '*', '+', '-'];


    findFirstSetOfNums();

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

        console.log(CURRENT_NUM_ARRAY);
    }

    /* caculate numbers based on the given operator */
    function compute(firstNum, operator, secondNum) {
        firstNum = Number(firstNum);
        secondNum = Number(secondNum);

        switch (operator) {
            case '/':
                return firstNum / secondNum;
            case '*':
                return firstNum * secondNum;
            case '+':
                return firstNum + secondNum;
            case '-':
                return firstNum - secondNum;
            default:
                console.log('invalid operator');
        }
    }
