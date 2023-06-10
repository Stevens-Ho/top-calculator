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
    } else if (operator === "x") {
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

function pressMathOperatorBtn() {
    const mathOperatorBtn = document.querySelectorAll(".mathOperatorBtn");
    mathOperatorBtn.forEach(btn => {
        btn.addEventListener("click", function() {
            if (answerDisplay.textContent) {
                answerDisplay.textContent += " " + btn.textContent + " ";
            }
        });
    });
}

function pressEqualBtn() {
    const equalBtn = document.getElementById("equal");
    equalBtn.addEventListener("click", function() {
        let split = answerDisplay.textContent.split(" ");
        let answer;
        let iteration = split.length - 2;
        for (let i = 0; i < iteration; i += 2) {
            const firstNumber = +split[0+i];
            const operator = split[1+i];
            const secondNumber = +split[2+i];
            if (i === 0) answer = firstNumber;
            console.log(firstNumber + operator + secondNumber);
            answer = operate(answer, operator, secondNumber);
            
        }
        answerDisplay.textContent = answer;
    });
}

function startCalculator() {
    pressNumberBtn();
    pressMathOperatorBtn();
    pressEqualBtn();
}

startCalculator();