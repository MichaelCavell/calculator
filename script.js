//Calculation Variables
let firstNumber = "";
let operator = "";
let secondNumber = "";
let solution = "";


//Basic Math Functions
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

//Takes operator and 2 numbers and calls one of the above functions on the numbers
function operate(firstNumber, operator, secondNumber) {
    if (operator === "+") {
        return add(firstNumber, secondNumber);
    } else if (operator === "-") {
        return subtract(firstNumber, secondNumber);
    } else if (operator === "*") {
        return multiply(firstNumber, secondNumber);
    } else if (operator === "÷") {
        return divide(firstNumber, secondNumber);
    } else {
        return;
    }
}

//Create the functions that populate the display when you click the number buttons
let displayValue = "";
const numberButtons = document.querySelectorAll('.numberBtn');
const operatorButtons = document.querySelectorAll('.opBtn');
const allClear = document.getElementById('clearBtn');
const equals = document.getElementById('equalBtn');
const calcNumber = document.getElementById('currentNumber');
const posToNeg = document.getElementById('posNeg');

posToNeg.addEventListener("click", function() {
    if (calcNumber.textContent === "Calculate THIS!" || calcNumber.textContent === "CLEAR!" || calcNumber.textContent === "To infinity and beyond!" || calcNumber.textContent === "+" || calcNumber.textContent === "-" || calcNumber.textContent === "*" || calcNumber.textContent === "÷") {
    return;
    }
    displayValue = -displayValue;
    calcNumber.textContent = -calcNumber.textContent;
    firstNumber = -firstNumber;
})

allClear.addEventListener("click", function() {
    firstNumber = "";
    operator = "";
    secondNumber = "";
    solution = "";
    displayValue = "";
    calcNumber.textContent = "CLEAR!";
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (operator === "=") {
            return;
       } else {
        //clear calc display of operator functions before adding #'s
        if (calcNumber.textContent === "+" || calcNumber.textContent === "-" || calcNumber.textContent === "*" || calcNumber.textContent === "÷") {
            calcNumber.textContent = "";
        }
        //clear calc display of strings before adding #'s
        if (calcNumber.textContent === "CLEAR!" || calcNumber.textContent === "Calculate THIS!" || calcNumber.textContent === "To infinity and beyond!") {
            calcNumber.textContent = "";
        }
        //this allows string together multiple operations without (=)'s to function properly
        if (solution !== "") {
            calcNumber.textContent = "";
            solution = "";
        }
        //update displayValue for operator handling
        displayValue += button.innerText;
        //update current number display in DOM
        calcNumber.textContent += button.innerText;
    }
})
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        //if dividing by zero, message and reset:
        if (calcNumber.textContent === "To infinity and beyond!") {
            calcNumber.textContent === "To infinity and beyond!";
            firstNumber = "";
            secondNumber = "";
            displayValue = "";
            operator = "";
            solution = "";
        //handle if operator button is pressed before a number button or "CLEAR!" or "Calculate THIS!"    
        } else if (calcNumber.textContent === "Calculate THIS!" || calcNumber.textContent === "CLEAR!") {
            return;
        } else if (calcNumber.textContent === "+" || calcNumber.textContent === "-" || calcNumber.textContent === "*" || calcNumber.textContent === "÷" || calcNumber.textContent === "=") {
            operator = button.innerText;
            calcNumber.textContent = button.innerText;
            return;
        //modify firstNumber and operator
        } else if (firstNumber === "") {
            firstNumber += displayValue;
            operator = button.innerText;
            displayValue = "";
            calcNumber.textContent = button.innerText;
        } else {
            //modify second number (first pass only, if solution hasn't been found prior)
            if (firstNumber !== "" && solution === "") {
            secondNumber += displayValue;
            //find solution
            let firstNumberInt = parseFloat(firstNumber);
            let secondNumberInt = parseFloat(secondNumber);
            solution = operate(firstNumberInt, operator, secondNumberInt);
            if (solution === Infinity) {
                calcNumber.textContent = "To infinity and beyond!"
                firstNumber = "";
                secondNumber = "";
                displayValue = "";
                operator = "";
            } else {
            calcNumber.textContent = Math.round(solution * 100) / 100;
            //get ready for more calcs
            firstNumber = Math.round(solution * 100) / 100;
            secondNumber = "";
            displayValue = "";
            operator = button.innerText;}
        //clear solution so that modify second number code will execute (after first pass, if solution has been found prior)
        } else {
            if (firstNumber !== "" && solution !== "") {
                operator = button.innerText;
                displayValue = "";
                calcNumber.textContent = button.innerText;
                solution = "";
            }
        }
    }
})
})

equals.addEventListener("click", function() {
    if (calcNumber.textContent === "Calculate THIS!" || calcNumber.textContent === "CLEAR!" || calcNumber.textContent === "To infinity and beyond!" || calcNumber.textContent === "+" || calcNumber.textContent === "-" || calcNumber.textContent === "*" || calcNumber.textContent === "÷") {
        return;
        }
    //modify second number
    if (firstNumber !== "" && solution === "") {
    secondNumber += displayValue;
    //find solution
    let firstNumberInt = parseFloat(firstNumber);
    let secondNumberInt = parseFloat(secondNumber);
    solution = operate(firstNumberInt, operator, secondNumberInt);
    if (solution === Infinity) {
        calcNumber.textContent = "To infinity and beyond!"
        firstNumber = "";
        secondNumber = "";
        displayValue = "";
        operator = "";
    } else {
    calcNumber.textContent = Math.round(solution * 100) / 100;
    //get ready for more calcs
    firstNumber = Math.round(solution * 100) / 100;
    secondNumber = "";
    displayValue = "";
    operator = "=";
}
}
})

