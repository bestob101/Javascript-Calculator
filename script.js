import { compute } from './calculator.js';

const dataButtons = document.querySelectorAll(".data");
const equalButton = document.querySelector(".equals-button");
const output = document.querySelector(".screen-output");
const clearAllButton = document.querySelector(".clear-all");

var equation = "";

dataButtons.forEach(button => {
    button.addEventListener('click', () => {
        equation += button.innerText;
        updateDisplay(equation);
    })
})

equalButton.addEventListener('click', () => {
    equation = output.innerText;
    var res = compute(equation);
    updateDisplay(res);
    equation = res;
})

clearAllButton.addEventListener('click', () => {
    clearDisplay();
})
function updateDisplay(text) {

    output.innerText = text;
}

function clearDisplay() {

    equation = "";
    updateDisplay(equation);
}


