function add(first, second) {
    return first + second
}
function subtract(first, second) {
    return first - second
}
function multiply(first, second) {
    return first * second
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

    return first / second
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

    let result = operator(first, second);

    if (result % 1 != 0 && typeof result === 'number') {
        result = result.toFixed(11 - digits(result));
    }

    return result;
}

function digits(num) {
    return Math.floor(Math.log10(num) + 1);
}

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const ac = document.querySelector('.ac');
const equals = document.querySelector('.equals');

function updateDisplayValue(e) {
    if (active === false) {
        active = true;
        displayValue = '';
    }

    // if (firstNumberEntered === true && secondNumberEntered === true) {
    //     display.textContent = firstNumber
    // }
    
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

numbers.forEach((number) => {
    number.addEventListener('click', updateDisplayValue);  
})

operators.forEach((operator) => {
    operator.addEventListener('click', updateNumbers);  
})

display.textContent = displayValue;

