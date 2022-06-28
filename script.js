import { Equation } from './calculator.mjs';

const dataButtons = document.querySelectorAll(".data");
const operandButtons = document.querySelectorAll(".operand");
const equalButton = document.querySelector(".equals-button");
const currentOutput = document.querySelector(".current-output");
const previousOutput = document.querySelector(".previous-output");
const clearAllButton = document.querySelector(".clear-all");

var currentExpression = "";
var previousExpression = "";

dataButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentExpression += button.innerText;
        updateDisplay(currentExpression, previousExpression);
    })
})

operandButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentExpression += " " + button.innerText + " ";
        updateDisplay(currentExpression, previousExpression)
    })
})

equalButton.addEventListener('click', () => {
    currentExpression = currentOutput.innerText;
    const equation = new Equation(currentExpression);
    var res = equation.compute();

    if (res === "Error") {
        currentExpression = "";
        updateDisplay("Error", previousExpression);
    }
    else {
        previousExpression = currentExpression;
        currentExpression = res;
        updateDisplay(currentExpression, previousExpression);
    }

})

clearAllButton.addEventListener('click', () => {
    clearDisplay();
})

function updateDisplay(current, previous) {

    currentOutput.innerText = current;
    previousOutput.innerText = previous;
}

function clearDisplay() {

    currentExpression = "";
    previousExpression = "";
    updateDisplay(currentExpression, previousExpression);
}



/* test commit 1*/