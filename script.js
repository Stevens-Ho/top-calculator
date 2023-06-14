const answerDisplay = document.querySelector(".answerDisplay");

function operate() {
    const split = answerDisplay.textContent.split(" ").filter(e => e);
    const firstNumber = +split[0];
    const operator = split[1];
    const secondNumber = +split[2];
    if (!isNaN(secondNumber)) {
        switch (operator) {
            case "+":
                answerDisplay.textContent = firstNumber + secondNumber;
                break;
            case "-":
                answerDisplay.textContent = firstNumber - secondNumber;
                break;
            case "x":
                answerDisplay.textContent = firstNumber * secondNumber;
                break;
            case "÷":
                answerDisplay.textContent = firstNumber / secondNumber;
                break;
        }
    }
}

function pressNumberBtn() {
    const numberBtn = document.querySelectorAll(".numberBtn");
    numberBtn.forEach(number => {
        window.addEventListener("keypress", keyboard => {
            if (number.textContent === keyboard.key) addEventListenerNumberBtn(number);
        });
        number.addEventListener("click", () => addEventListenerNumberBtn(number));
    });
}

function addEventListenerNumberBtn(number) {
    const split = answerDisplay.textContent.split(" ");
    const firstNumber = split[0];
    const mathOperator = split[1];
    const secondNumber = split[2];
     if (number.textContent === "0") {
        if ((firstNumber === "") || (secondNumber === "") || 
        // number start with 0, e.g. 0.123
        // only can have one 0, can`t accept 00.123
        (/(0\.)|([1-9]+\.*)/g.test(firstNumber) && !/[\+\-x÷]/g.test(mathOperator)) ||
        (/(0\.)|([1-9]+\.*)/g.test(secondNumber))
        // number after decimal can accept 0 more than one, e.g. 0.00123000
        // number before decimal and the number not start from 0 can accept 0 more than one, e.g. 99009
        ) {
            answerDisplay.textContent += number.textContent;
        } 
    } else if (number.textContent !== "0"){
        //when click number after 0 without a decimal, the number will replace 0
        if ((/^0$/g.test(firstNumber) && !mathOperator) || /^0$/g.test(secondNumber)) {
            answerDisplay.textContent = answerDisplay.textContent.replace(/0$/g, number.textContent);
        } else {
            answerDisplay.textContent += number.textContent;
        }
    }
}

function pressMathOperatorBtn() {
    const mathOperatorBtn = document.querySelectorAll(".mathOperatorBtn");
    mathOperatorBtn.forEach(btn => {
        btn.addEventListener("click", () => addEventListenerMathOperator(btn));
        window.addEventListener("keypress",keyboard => {
            if (keyboard.key === "*" && btn.textContent === "x") addEventListenerMathOperator(btn);
            else if (keyboard.key === "/" && btn.textContent === "÷") addEventListenerMathOperator(btn);
            else if (keyboard.key === btn.textContent) addEventListenerMathOperator(btn);
        });
    });
}

function addEventListenerMathOperator(btn) {
    const mathOperator = " " + btn.textContent + " ";
    if (!/ [\+\-x÷] /g.test(answerDisplay.textContent) && answerDisplay.textContent) {
        answerDisplay.textContent += mathOperator;
    } else if (/ [\+\-x÷] $/g.test(answerDisplay.textContent)) {
        answerDisplay.textContent = answerDisplay.textContent.replace(/ [\+\-x÷] /g, mathOperator);
    }  else if (/ [\+\-x÷] /g.test(answerDisplay.textContent)) {
        operate();
        answerDisplay.textContent += mathOperator;
    }
}

function pressEqualBtn() {
    const equalBtn = document.getElementById("equal");
    equalBtn.addEventListener("click", operate);
    window.addEventListener("keypress", keyboard => {
        if (keyboard.key === "=" || keyboard.key === "Enter") {
            operate();
        }
    });
}

function pressClearBtn() {
    const clear = document.getElementById("clear");
    clear.addEventListener("click", () => answerDisplay.textContent = "");
}

function pressDeleteBtn() {
    const del = document.getElementById("del");
    del.addEventListener("click", () => {
        if (/ [\+\-x÷] $/g.test(answerDisplay.textContent)) {
            answerDisplay.textContent = answerDisplay.textContent.slice(0, -3);
        } else {
            answerDisplay.textContent = answerDisplay.textContent.slice(0, -1);
        }
    });
}

function addEventListenerDot() {
    const split = answerDisplay.textContent.split(" ").filter(e => e);  
    const firstNumber = split[0];
    const operator = split[1];
    const secondNumber = split[2];
    if ((!/\./.test(firstNumber) && /\d+/.test(firstNumber) && !operator) ||
    (!/\./.test(secondNumber) && /\d+/.test(secondNumber))) {
        answerDisplay.textContent += dot.textContent;
    }
}

function pressDotBtn() {
    const dot = document.getElementById("dot");
    dot.addEventListener("click", addEventListenerDot);
    window.addEventListener("keypress", keyboard => {
        if (keyboard.key === ".") addEventListenerDot();
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