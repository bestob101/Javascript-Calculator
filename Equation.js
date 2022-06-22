function isValidEquation(equation) {

    const parts = equation.split(" ");

    if (parts.length % 2 != 1) return false;

    for (var i = 0; i < parts.length; i++) {

        if (i % 2 == 0) {
            if (isNaN(parts[i]))
                return false;
        }

        if (i % 2 == 1) {
            if (!isOperand(parts[i]))
                return false;
        }
    }
    return true; 
}

function isOperand(str) {

    if (str === '+' || str === '-' || str === '*' || str === '/')
        return true;
    else
        return false;

}

function evaluateSubEquation(equation) {

    if (equation.length == 0)
        return 0;

    if (equation.length == 1)
        return equation[0];

    for (var i = 0; i < equation.length; i++) {
        if (equation[i] === '*') {
            let res = parseFloat(equation[i-1]) * parseFloat(equation[i+1]);
            equation.splice(i-1, 3, res);
            return evaluateSubEquation(equation);
        }
    }
    
    for (var i = 0; i < equation.length; i++) {
        if (equation[i] === '/') {
            let res = parseFloat(equation[i-1]) / parseFloat(equation[i+1]);
            equation.splice(i-1, 3, res);
            return evaluateSubEquation(equation);
        }
    }

    for (var i = 0; i < equation.length; i++) {
        if (equation[i] === '+') {
            let res = parseFloat(equation[i-1]) + parseFloat(equation[i+1]);
            equation.splice(i-1, 3, res);
            return evaluateSubEquation(equation);
        }
    }

    for (var i = 0; i < equation.length; i++) {
        if (equation[i] === '-') {
            let res = parseFloat(equation[i-1]) - parseFloat(equation[i+1]);
            equation.splice(i-1, 3, res);
            return evaluateSubEquation(equation);
        }
    }
    
} 

 
 class Equation {

    constructor(equation) {
        
        if (typeof equation !== 'string') throw "Equation must be of string";

        if (!(isValidEquation(equation))) throw "Equation is invalid";

        this.equation = equation;

    }

    evaluate() {

        const parts = this.equation.split(" ");


        var result = evaluateSubEquation(parts);

        return result;
    }
 }


 const e = new Equation("-2 - 5");

 console.log(e.evaluate());
