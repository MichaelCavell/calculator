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

console.log(add(2, 3));
console.log(subtract(2, 3));
console.log(multiply(2, 3));
console.log(divide(2, 3));

let firstNumber;
let operator;
let secondNumber;

function operate(first, operator, second) {
    return operator(first, second);
}

console.log(operate(2, add, 3))
console.log(operate(2, subtract, 3))
console.log(operate(2, multiply, 3))
console.log(operate(2, add, 3))