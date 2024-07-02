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
        updateDisplay('l o l');
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
const equalsButton = document.querySelector('.equals');
const plusMinusButton = document.querySelector('.plus-minus');
const percentButton = document.querySelector('.percent');
const decimalButton = document.querySelector('.decimal');
const backspaceButton = document.querySelector('.backspace-button');

function updateDisplay(value) {
    display.textContent = value;
}


function updateDisplayValue(e) {
    if (active === false) {
        active = true;
        displayValue = '';
    }

    if (displayValue.length === 0 && e.target.innerText == 0) {
        return;
    }

    if (displayValue.length >= 22 && displayValue) {
        return;
    }
    
    displayValue += e.target.innerText;
    updateDisplay(displayValue);
}

function keyboardUpdateDisplayValue(key) {
    if (active === false) {
        active = true;
        displayValue = '';
    }

    if (displayValue.length === 0 && key == 0) {
        return;
    }

    if (displayValue.length >= 22 && displayValue) {
        return;
    }
    
    displayValue += key;
    updateDisplay(displayValue)
} 

function clearDisplay() {
    operators.forEach(operator => operator.classList.remove('active'));
    active = false;
    displayValue = '0';
    updateDisplay(displayValue)
    firstNumberEntered = false
    secondNumberEntered = false;
}

function makeActive(e){
    operators.forEach(operator => operator.classList.remove('active'));
    e.target.classList.add('active');
}

function updateNumbers(e) {
    operators.forEach(operator => operator.classList.remove('active'));
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
        updateDisplay(firstNumber);
        operator = e.target.innerText;
        active = false;
    } else if (firstNumberEntered === true && secondNumberEntered === true) {
        secondNumber = Number(displayValue);
        firstNumber = operate(firstNumber, operator, secondNumber);
        updateDisplay(firstNumber);
        operator = e.target.innerText;
        active = false;
    } 
}

function keyboardUpdateNumbers(key) {
    operators.forEach(operator => operator.classList.remove('active'));
    if (firstNumberEntered === false && secondNumberEntered === false) {
        firstNumber = Number(displayValue);
        secondNumber = Number(displayValue);
        operator = key;
        firstNumberEntered = true;
        active = false;
    } else if (firstNumberEntered === true && secondNumberEntered === false) {
        secondNumber = Number(displayValue);
        secondNumberEntered = true;
        firstNumber = operate(firstNumber, operator, secondNumber);
        updateDisplay(firstNumber);
        operator = key;
        active = false;
    } else if (firstNumberEntered === true && secondNumberEntered === true) {
        secondNumber = Number(displayValue);
        firstNumber = operate(firstNumber, operator, secondNumber);
        updateDisplay(firstNumber);
        operator = key;
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
    return round(operate(operate(num, '/', 100), '*', 10));
}

percentButton.addEventListener('click', function() {
    displayValue = percent(displayValue);
    updateDisplay(displayValue);
})

plusMinusButton.addEventListener('click', function() {
    displayValue = plusMinus(displayValue);
    updateDisplay(displayValue);
})

function backspace() {
    if (displayValue.toString().length === 1) {
        displayValue = 0;
        updateDisplay(displayValue);
        active = false;
    } else {
        active = false;
        displayValue = displayValue.toString().slice(0, -1);
        updateDisplay(displayValue);
        active = true;
    } 
}

backspaceButton.addEventListener('click', backspace);

ac.addEventListener('click', clearDisplay);

function equals() {
    operators.forEach(operator => operator.classList.remove('active'));
    if (firstNumberEntered) {
        secondNumber = Number(displayValue);
        firstNumber = operate(firstNumber, operator, secondNumber);
        updateDisplay(firstNumber);
        displayValue = firstNumber
        secondNumber = ''
        firstNumberEntered = false;
        secondNumberEntered = false;
        active = false;
    } 
}

equalsButton.addEventListener('click', equals)

function decimal(e) {
    if ((displayValue.toString().split('.')[1]) !== undefined) {
        return;
    }
    updateDisplayValue(e)
}

function keyboardDecimal(key) {
    if ((displayValue.toString().split('.')[1]) !== undefined) {
        return;
    }
    keyboardUpdateDisplayValue(key)
}

decimalButton.addEventListener('click', decimal);

numbers.forEach((number) => {
    number.addEventListener('click', updateDisplayValue);  
})

operators.forEach((operator) => {
    operator.addEventListener('click', updateNumbers);  
})

operators.forEach((operator) => {
    operator.addEventListener('click', makeActive);  
})

addEventListener('keydown', (e) => {
    let operatorSymbols = ['+', '-', '*', '/']
    if (operatorSymbols.includes(e.key)) {
        keyboardUpdateNumbers(e.key);
        operators.forEach(operator => operator.classList.remove('active'));
        Array.from(operators).map((operator) => {
            if (operator.classList.contains(e.key)) {
                operator.classList.add('active');
            }
        })
    }

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    if (numbers.includes(Number(e.key))) {
        keyboardUpdateDisplayValue(e.key)
    }
    
    if (e.key === 'Enter' || e.key === '=') {
        equals();
    }

    if (e.key === 'Backspace') {
        backspace();
    }
    
    if (e.key === '.') {
        keyboardDecimal(e.key);
    }

    if (e.key === '%') {
        displayValue = percent(displayValue);
        updateDisplay(displayValue)
    }
})

updateDisplay(displayValue)
