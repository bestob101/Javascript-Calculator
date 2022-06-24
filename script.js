import { compute } from './calculator.js';

const dataButtons = document.querySelectorAll(".data");
const equalButton = document.querySelector(".equals-button");
const output = document.querySelector(".screen-output");

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

function updateDisplay(text) {

    output.innerText = text;
}


/* test commit 1*/