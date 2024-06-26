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

function operate(first, operator, second) {
    return operator(first, second);
}