
function convertEquationToArray(equation) {

    if (typeof equation !== 'string') throw "Equation must be of string";

    var array;
    if ( (array = convertToEquationToArrayHelper(equation)) == null) return "Error";

    else return array;

}

function convertToEquationToArrayHelper(equation) {

    const parts = equation.split("");

    var isNumber = false;
    var numberString = "";
    var decimal = false;
    var containsNumber = false;

    const array = [];
    let j = 0;
    let i = 0;
    while (i < parts.length) {
    

        if (isNaN(parts[i]) && !(parts[i] === '-' || parts[i] === '+' || parts[i] === '*' || parts[i] === '/' || parts[i] === '.' || parts[i] === ' ')) {
            console.log("invalid character");
            return null;
        }

        if (parts[i] === '-' || parts[i] === '+' || parts[i] === '*' || parts[i] === '/' || parts[i] === ' ')
        {
            if (numberString === ".") {
                console.log("single decimal point");
                return null;
            }

            if (numberString !== "") {
                array.push(numberString);
                numberString = "";
                isNumber = false;
                decimal = false;
                containsNumber = true;
            }
            
            if (parts[i] === ' ') {
                i++;
                continue;
            } else {
                array.push(parts[i]);
            }

        }

        if (!isNaN(parts[i]) || parts[i] === '.') {
            
            if (parts[i] === '.') {
                if (decimal == true) {
                    console.log("2 decimal points");
                    return null;
                }
                else {
                    decimal = true;
                }
            }

            numberString += parts[i];

            if (i == parts.length - 1) {
                if (numberString === ".") {
                    console.log("single decimal point");
                    return null;
                }

                array.push(numberString);
                containsNumber = true;
            }
        }

        i++;
    }

    if (array.length == 0 || !containsNumber) {
        console.log(array);
        console.log("no number or array is empty");
        return null;
    }

    return array;

}

function evaluate(equation) {

    if (equation[0] === '-') {
        let num = equation[0] + equation[1];
        equation.splice(0, 2, num);
    }

    for (var i = 0; i < equation.length; i++) {

        if (equation[i] === '-') {
            var num = equation[i] + equation[i+1];
            equation[i] = '+';
            equation[i+1] = num;
        }
    }
    if (!isValidEquation(equation)) {

        return null;
    }

    var res = evaluateHelper(equation);

    return res;
}

function evaluateHelper(equation) {

    if (equation.length == 0)
        return 0;

    if (equation.length == 1)
        return equation[0];

    var i = 0;
    while (i < equation.length) {
        var operation = equation[i];
        
        switch (operation) {

            case '*':
                var res = parseFloat(equation[i-1]) * parseFloat(equation[i+1]);
                equation.splice(i-1, 3, res);
                return evaluateHelper(equation);
                break;
            
            case '/':
                var res = parseFloat(equation[i-1]) / parseFloat(equation[i+1]);
                equation.splice(i-1, 3, res);
                return evaluateHelper(equation);
                break;

            default:
                i++;
        }
    }

    for (var i = 0; i < equation.length; i++) {
        if (equation[i] === '+') {
            let res = parseFloat(equation[i-1]) + parseFloat(equation[i+1]);
            equation.splice(i-1, 3, res);
            return evaluateHelper(equation);
        }
    }

}

function isValidEquation(equation) {

    if (equation.length % 2 != 1) return false;

    for (var i = 0; i < equation.length; i++) {

        if ( !isNaN(equation[i]) && i % 2 != 0 ) return false;

        if ( isOperand(equation[i]) && i % 2 != 1 ) return false;
    }

    return true;
}

function isOperand(character) {

    if (character === '+' || character === '-' || character === '*' || character === '/')
        return true;
    
    return false;
}

function compute(equation) {

    const equationArray = convertEquationToArray(equation);

    if (equationArray === "Error") return equationArray;

    else {
        return evaluate(equationArray);
    }
}

export { compute };


