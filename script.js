const dataButtons = document.querySelectorAll(".data");
const equalButton = document.getElementById(".equals-button");
const output = document.querySelector(".screen-output");


dataButtons.forEach(button => {
    button.addEventListener('click', () => {
        updateDisplay(button.innerText);
    })
})

function updateDisplay(text) {

    output.innerHTML += text;
}