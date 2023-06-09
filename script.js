const answerDisplay = document.querySelector(".answerDisplay");
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(firstNumber, operator, secondNumber) {
    if (operator === "+") {
        return add(firstNumber, secondNumber);
    } else if (operator === "-") {
        return subtract(firstNumber, secondNumber);
    } else if (operator === "*") {
        return multiply(firstNumber, secondNumber);
    } else if (operator === "÷") {
        return divide(firstNumber, secondNumber);
    }
}

function pressNumberBtn() {
    const numberBtn = document.querySelectorAll(".numberBtn");

    numberBtn.forEach(number => {
        number.addEventListener("click", function() {
            answerDisplay.textContent += number.textContent;
        });
    });
}

function startCalculator() {
    pressNumberBtn();
}
