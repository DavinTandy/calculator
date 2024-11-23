const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const clear = document.getElementById("clear");
const del = document.getElementById("delete");
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
const percent = document.getElementById("percent");
const comma = document.getElementById("comma");
let commaBool = true;
const bracket = document.getElementById("bracket");
let openBracket = 0;
const equal = document.getElementById("equal");

clear.addEventListener("click", function() {
    line1.textContent = "0";
    line2.textContent = "";
    commaBool = true;
})

del.addEventListener("click", function() {
    if (line1.textContent.charAt(line1.textContent.length - 1) === ".") {
        commaBool = true;
    } else if (line1.textContent.charAt(line1.textContent.length - 1) === "(") {
        openBracket -= 1;
    }
    line1.textContent = line1.textContent.slice(0, -1);
    operate(line1.textContent)
})

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function() {
        if (line1.textContent.length >= 18) {
            return;
        } else if (line1.textContent.charAt(line1.textContent.length - 1) === "%") {
            line1.textContent += "×" + numbers[i].textContent;
        } else if (line1.textContent === "0") {
            line1.textContent = numbers[i].textContent;
        } else {
            line1.textContent += numbers[i].textContent;
        }
        operate(line1.textContent)
    })
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", function() {
        if (line1.textContent.length >= 18) {
            return;
        } else if (line1.textContent === "0") {
            return;
        } else if (line1.textContent.charAt(line1.textContent.length - 1) === "(") {
            if (operators[i].textContent === "×" || operators[i].textContent === "÷") {
                return;
            }
        }
        for (let j = 0; j < operators.length; j++) {
            if (line1.textContent.charAt(line1.textContent.length - 1) === operators[j].textContent) {
                return;
            }
        }
        line1.textContent += operators[i].textContent;
        commaBool = true;
        operate(line1.textContent)
    })
}

percent.addEventListener("click", function() {
    if (line1.textContent.length >= 18) {
        return;
    } else if (line1.textContent.charAt(line1.textContent.length - 1) === "%" || line1.textContent.charAt(line1.textContent.length - 1) === "(") {
        return;
    }
    for (let i = 0; i < operators.length; i++) {
        if (line1.textContent.charAt(line1.textContent.length - 1) === operators[i].textContent) {
            return;
        }
    }
    line1.textContent += "%";
    operate(line1.textContent)
})

comma.addEventListener("click", function() {
    if (line1.textContent.length >= 18) {
        return;
    }
    for (let i = 0; i < operators.length; i++) {
        if (line1.textContent.charAt(line1.textContent.length - 1) === operators[i].textContent || line1.textContent.charAt(line1.textContent.length - 1) === "(") {
            line1.textContent += "0" + comma.textContent;
            commaBool = false;
        }
        if (line1.textContent.charAt(line1.textContent.length - 1) === ")") {
            line1.textContent += "×0" + comma.textContent;
            commaBool = false;
        }
    }
    if (commaBool === true) {
        line1.textContent += comma.textContent;
        commaBool = false;
    }
    operate(line1.textContent)
})

bracket.addEventListener("click", function() {
    if (line1.textContent.length >= 18) {
        return;
    }
    if (openBracket === 0) {
        if (line1.textContent === "0") {
            line1.textContent = "(";
            openBracket += 1;
            return;
        } else if (line1.textContent.charAt(line1.textContent.length - 1) === ")") {
            line1.textContent += "×(";
            openBracket += 1;
            return;
        }
        for (let i = 0; i < numbers.length; i++) {
            if (line1.textContent.charAt(line1.textContent.length - 1) === numbers[i].textContent) {
                line1.textContent += "×(";
                openBracket += 1;
                return;
            }
        }
        line1.textContent += "(";
        openBracket += 1;
    } else {
        if (line1.textContent.charAt(line1.textContent.length - 1) === "(") {
            line1.textContent += "(";
            openBracket += 1;
            return;
        }
        for (let i = 0; i < operators.length; i++) {
            if (line1.textContent.charAt(line1.textContent.length - 1) === operators[i].textContent) {
                line1.textContent += "(";
                openBracket += 1;
                return;
            }
        }
        line1.textContent += ")";
        openBracket -= 1;
    }
    operate(line1.textContent)
})

equal.addEventListener("click", function() {
    operate(line1.textContent);
})

function operate(operation) {
    if (eval(operation.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("%", "/100"))) {
        line2.textContent = eval(operation.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("%", "/100"));
    }
}