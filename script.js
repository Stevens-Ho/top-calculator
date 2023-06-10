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
            let lastLetter = answerDisplay.textContent[answerDisplay.textContent.length - 1];
            if (number.textContent !== "0" || 
            (number.textContent === "0" && answerDisplay.textContent && lastLetter !== " ")) {
                answerDisplay.textContent += number.textContent;
            }
        });
    });
}

function pressMathOperatorBtn() {
    const mathOperatorBtn = document.querySelectorAll(".mathOperatorBtn");
    mathOperatorBtn.forEach(btn => {
        btn.addEventListener("click", function() {
            const mathOperator = " " + btn.textContent + " ";
            const regexMathOperator = / [\+\-x÷] /g;
            const regexMathOperatorLastLetter = / [\+\-x÷] $/g;
            if (!regexMathOperator.test(answerDisplay.textContent) && answerDisplay.textContent) {
                answerDisplay.textContent += mathOperator;
            } else if (regexMathOperatorLastLetter.test(answerDisplay.textContent)) {
                answerDisplay.textContent.replace(" + ", mathOperator);
                answerDisplay.textContent = answerDisplay.textContent.replace(regexMathOperator, mathOperator);
            }  else if (/ [\+\-x÷] /g.test(answerDisplay.textContent)) {
                calculateSolution();
                answerDisplay.textContent += mathOperator;
            }
        });
    });
}

function calculateSolution() {
    let split = answerDisplay.textContent.split(" ").filter(e => e);  
    let answer;
    if (split.length > 2) {
        let iteration = split.length - 2;
        for (let i = 0; i < iteration; i += 2) {
            const firstNumber = +split[0+i];
            const operator = split[1+i];
            const secondNumber = +split[2+i];
            if (i === 0) answer = firstNumber;
            answer = operate(answer, operator, secondNumber);
        }
        return answerDisplay.textContent = answer;
    }
    return answerDisplay.textContent;
}

function pressEqualBtn() {
    const equalBtn = document.getElementById("equal");
    equalBtn.addEventListener("click", calculateSolution);
}

function pressClearBtn() {
    const clear = document.getElementById("clear");
    clear.addEventListener("click", function() {
        answerDisplay.textContent = "";
    });
}

function pressDeleteBtn() {
    const del = document.getElementById("del");
    del.addEventListener("click", function() {
        if (answerDisplay.textContent[answerDisplay.textContent.length - 1] === " ") {
            answerDisplay.textContent = answerDisplay.textContent.slice(0, -3);
        } else {
            answerDisplay.textContent = answerDisplay.textContent.slice(0, -1);
        }
    });
}

function pressDotBtn() {
    const dot = document.getElementById("dot");
    dot.addEventListener("click", () => {
        const hasDot = /\./g;
        if (!hasDot.test(answerDisplay.textContent) && answerDisplay.textContent) {
            answerDisplay.textContent += dot.textContent;
        }
    });
}

function startCalculator() {
    pressNumberBtn();
    pressMathOperatorBtn();
    pressEqualBtn();
    pressClearBtn();
    pressDeleteBtn();
    pressDotBtn();
}

startCalculator();