function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

const container = document.getElementById("container");
const buttons = container.getElementsByClassName("btn");
const display = document.getElementById("display");

let displayText = "";

function populateDisplayOnClick() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', (event) => {
            if (buttons[i].getAttribute('value') === 'clear') {
                clearDisplay();
            } else if (buttons[i].getAttribute('value') === 'delete') {
                deleteDisplay();
            } else if (buttons[i].getAttribute('value') === '=' ) {
                checkOperator();
            } else {
                if (buttons[i].getAttribute('value') === '+' || buttons[i].getAttribute('value') === '-' || buttons[i].getAttribute('value') === '*' || buttons[i].getAttribute('value') === '/') {
                    checkOperator();
                }
                displayText += buttons[i].getAttribute('value');
            }
            display.innerHTML = displayText;
        });
    }
}

function populateDisplayOnKeyDown() {
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (key === "=") {
            checkOperator();
            return;
        }
        for (let i = 0; i < buttons.length; i++) {
            if (key === buttons[i].getAttribute('value')) {
                displayText += buttons[i].getAttribute('value');
                display.innerHTML = displayText;
            }
        }
    });
}

//Helper function clear()
function clearDisplay() {
    displayText = "";
}

//Helper function delete()
function deleteDisplay() {
    displayText = displayText.substring(0, displayText.length -1);
}

//Helper function that checks whether an operator is clicked
function checkOperator() {
    let numberArray = [];
    for (let i = 0; i < displayText.length; i++) {
        switch (displayText.charAt(i)) {
            case "+":
                numberArray = displayText.split("+");
                clearDisplay();
                displayText = operate("+", +numberArray[0], +numberArray[1]);
            case "-":
                numberArray = displayText.split("-");
                clearDisplay();
                displayText = operate("-", +numberArray[0], +numberArray[1]);
            case "*":
                numberArray = displayText.split("*");
                clearDisplay();
                displayText = operate("*", +numberArray[0], +numberArray[1]);
            case "/":
                numberArray = displayText.split("/");
                clearDisplay();
                displayText = operate("/", +numberArray[0], +numberArray[1]);
        }
        display.innerHTML = displayText;
    }
    
}

populateDisplayOnClick();
populateDisplayOnKeyDown();