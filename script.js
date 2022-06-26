import { Equation } from './calculator.mjs';

const dataButtons = document.querySelectorAll(".data");
const operandButtons = document.querySelectorAll(".operand");
const equalButton = document.querySelector(".equals-button");
const output = document.querySelector(".screen-output");
const clearAllButton = document.querySelector(".clear-all");

var expression = "";

dataButtons.forEach(button => {
    button.addEventListener('click', () => {
        expression += button.innerText;
        updateDisplay(expression);
    })
})

operandButtons.forEach(button => {
    button.addEventListener('click', () => {
        expression += " " + button.innerText + " ";
        updateDisplay(expression)
    })
})

equalButton.addEventListener('click', () => {
    expression = output.innerText;
    const equation = new Equation(expression);
    var res = equation.compute();
    updateDisplay(res);
    expression = res;
})

clearAllButton.addEventListener('click', () => {
    clearDisplay();
})

function updateDisplay(text) {

    output.innerText = text;
}

function clearDisplay() {

    expression = "";
    updateDisplay(expression);
}



