
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

let str = "2.45-3.4 * 41 + 5";

const arr = convertEquationToArray(str);

console.log(arr);
