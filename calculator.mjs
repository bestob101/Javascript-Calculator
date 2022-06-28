class Equation {

    #answer;

    constructor(expression) {

        this.expression = expression;
        this.#answer = null;
    }

    getAnswer() { return this.#answer; }

    setAnswer(answer) { this.#answer = answer; }

    compute() {

        const expressionArray = Equation.#convertExpressionToArray(this.expression);

        if (Equation.#isValidExpression(expressionArray)) {
            return this.#computeAnswer(expressionArray);
        } else {
            return "Error";
        }
    }

    #computeAnswer(expressionArray) {

        var i = 0;
        while (i < expressionArray.length) {
            var operation = expressionArray[i];
            
            switch (operation) {

                case '*':
                    var res = parseFloat(expressionArray[i-1]) * parseFloat(expressionArray[i+1]);
                    expressionArray.splice(i-1, 3, res);
                    break;
                
                case '/':
                    var res = parseFloat(expressionArray[i-1]) / parseFloat(expressionArray[i+1]);
                    expressionArray.splice(i-1, 3, res);
                    break;

                default:
                    i++;
            }
        }

        for (var i = 0; i < expressionArray.length; i++) {
            if (expressionArray[i] === '+') {
                let res = parseFloat(expressionArray[i-1]) + parseFloat(expressionArray[i+1]);
                expressionArray.splice(i-1, 3, res);
            }
        }

        if (expressionArray.length != 1) {
            return "Error";
        }
        else {
            return expressionArray[0];
        }
    }

    static #convertExpressionToArray(expression) {

        const expressionParts = expression.split("");

        var numberString = "";
        var containsDecimal = false;

        const expressionArray = [];
        var i = 0;
        while (i < expressionParts.length) {

            if (expressionParts[i] === '-' || expressionParts[i] === '+' || expressionParts[i] === '*' || expressionParts[i] === '/' || expressionParts[i] === ' ')
            {

                if (numberString !== "") {
                    expressionArray.push(numberString);
                    numberString = "";
                    containsDecimal = false;
                }
                
                if (expressionParts[i] === ' ') {
                    i++;
                    continue;
                } else {
                    expressionArray.push(expressionParts[i]);
                }

            }

            if (!isNaN(expressionParts[i]) || expressionParts[i] === '.') {

                numberString += expressionParts[i];

                if (i == expressionParts.length - 1) {

                    expressionArray.push(numberString);
                }
            }
            i++;
        }

        if (expressionArray[0] === '-') {
            let num = expressionArray[0] + expressionArray[1];
            expressionArray.splice(0, 2, num);
        }
    
        for (var i = 0; i < expressionArray.length; i++) {
    
            if (expressionArray[i] === '-') {
                var num = expressionArray[i] + expressionArray[i+1];
                expressionArray[i] = '+';
                expressionArray[i+1] = num;
            }
        }

        return expressionArray;
    
    }

    static #isValidExpression(expression) {

        if (expression.length % 2 != 1) return false;
    
        for (var i = 0; i < expression.length; i++) {
    
            if ( !isNaN(expression[i]) && i % 2 != 0 ) return false;
    
            if ( Equation.#isOperand(expression[i]) && i % 2 != 1 ) return false;
        }
    
        return true;
    }

    static #isOperand(character) {

        if (character === '+' || character === '-' || character === '*' || character === '/')
            return true;
        
        return false;
    }
}

export { Equation }


