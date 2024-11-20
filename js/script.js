const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function() {
        if (line1.textContent === "0") {
            line1.textContent = numbers[i].textContent;
        } else {
            line1.textContent += numbers[i].textContent
        }
    })
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", function() {
        if (line1.textContent === "0") {
            return;
        }
        for (let j = 0; j < operators.length; j++) {
            if (line1.textContent.charAt(line1.textContent.length - 1) === operators[j].textContent) {
                return;
            }
        }
        line1.textContent += operators[i].textContent;
    })
}

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

function operator(num1, num2, operator) {
    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "×") {
        return multiply(num1, num2);
    } else if (operator === "÷") {
        return divide(num1, num2);
    }
}