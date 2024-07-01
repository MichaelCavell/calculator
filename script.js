function add(first, second) {
    return round(first) + round(second)
}
function subtract(first, second) {
    return round(first) - round(second)
}
function multiply(first, second) {
    return round(first) * round(second);
}
function divide(first, second) {
    if (second === 0) {
        display.textContent = 'l o l';
        active = false;
        displayValue = '0';
        firstNumberEntered = false
        secondNumberEntered = false;
        firstNumber = '';
        secondNumber = '';
        return 'l o l';
    }
    return round(first) / round(second)
}

let firstNumber = 0;
let operator;
let secondNumber;
let displayValue = '0';
let active = false;
let firstNumberEntered = false
let secondNumberEntered = false;

function operate(first, operator, second) {
    if (operator === '+') {
        operator = add;
    } else if (operator === '-') {
        operator = subtract;
    } else if (operator === '*') {
        operator = multiply;
    } else if (operator === '/') {
        operator = divide;
    }

    return operator(Number(first), Number(second));
}

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const ac = document.querySelector('.ac');
const equals = document.querySelector('.equals');
const plusMinusButton = document.querySelector('.plus-minus');
const percentButton = document.querySelector('.percent');
const decimalButton = document.querySelector('.decimal');
const backspaceButton = document.querySelector('.backspace-button');


function updateDisplayValue(e) {
    if (active === false) {
        active = true;
        displayValue = '';
    }
    
    displayValue += e.target.innerText;
    display.textContent = displayValue;
}

function clearDisplay() {
    active = false;
    displayValue = '0';
    display.textContent = displayValue;
    firstNumberEntered = false
    secondNumberEntered = false;
}

function updateNumbers(e) {
    if (firstNumberEntered === false && secondNumberEntered === false) {
        firstNumber = Number(displayValue);
        secondNumber = Number(displayValue);
        operator = e.target.innerText;
        firstNumberEntered = true;
        active = false;
    } else if (firstNumberEntered === true && secondNumberEntered === false) {
        secondNumber = Number(displayValue);
        secondNumberEntered = true;
        firstNumber = operate(firstNumber, operator, secondNumber);
        display.textContent = firstNumber;
        operator = e.target.innerText;
        active = false;
    } else if (firstNumberEntered === true && secondNumberEntered === true) {
        secondNumber = Number(displayValue);
        firstNumber = operate(firstNumber, operator, secondNumber);
        display.textContent = firstNumber;
        operator = e.target.innerText;
        active = false;
    } 
}

function plusMinus(num) {
    if (num > 0) {
        return -Math.abs(num);
    } else if (num < 0) {
        return Math.abs(num);
    } else {
        return 0;
    }
}

function round(num) {
    return parseFloat(Number(num).toFixed(3));
}

function percent(num) {
    let decimal = ((num.toString().split('.')[1]));
    if (decimal) {
        if (decimal.length >= 4) {
            return num;
        }
    }

    let percent = operate(num, '*', .01);
    return percent;
}

percentButton.addEventListener('click', function() {
    if (active) {
        displayValue = percent(displayValue);
        display.textContent = displayValue;
    }
})

plusMinusButton.addEventListener('click', function() {
    displayValue = plusMinus(displayValue);
    display.textContent = displayValue;
})

backspaceButton.addEventListener('click', function() {
    if (displayValue.toString().length === 1) {
        displayValue = 0;
        display.textContent = displayValue;
        active = false;
    } else {
        active = false;
        displayValue = displayValue.toString().slice(0, -1);
        display.textContent = displayValue;
        active = true;
    }
})

ac.addEventListener('click', clearDisplay);

equals.addEventListener('click', function() {
    if (firstNumberEntered) {
        secondNumber = Number(displayValue);
        firstNumber = operate(firstNumber, operator, secondNumber);
        display.textContent = firstNumber;
        displayValue = firstNumber
        secondNumber = ''
        firstNumberEntered = false;
        secondNumberEntered = false;
        active = false;
    }
})

decimalButton.addEventListener('click', function(e) {
    if ((displayValue.toString().split('.')[1]) !== undefined) {
        return;
    }
    updateDisplayValue(e)
})

numbers.forEach((number) => {
    number.addEventListener('click', updateDisplayValue);  
})

operators.forEach((operator) => {
    operator.addEventListener('click', updateNumbers);  
})

display.textContent = displayValue;

