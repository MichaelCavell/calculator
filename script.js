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
    return first / second
}

let firstNumber;
let operator;
let secondNumber;
let displayValue = '0';
let active = false;

function operate(first, operator, second) {
    return operator(first, second);
}

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number')

function updateDisplayValue(e) {
    if (active === false) {
        active = true;
        displayValue = '';
    }
    
    displayValue += e.target.innerText;
    display.textContent = displayValue;
}

numbers.forEach((number) => {
    number.addEventListener('click', updateDisplayValue);  
})

display.textContent = displayValue;

