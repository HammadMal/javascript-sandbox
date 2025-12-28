num1= 10;
num2 = 2;
operator = '/';

const calculator = (num1, num2, operator) => {

    let result = 0;

    switch (operator) {
        case '+':
            result = num1+num2;
            console.log(result, "The operation was", operator);
            break;
        case '-':
            result = num1-num2;
            console.log(result, "The operation was", operator);
            break;
        case '*':
            result = num1*num2;
            console.log(result, "The operation was", operator);
            break;
        case '/':
            result = num1/num2;
            console.log(result, "The operation was", operator);
            break;

        default :
        console.log("Unsupported operator");
    }



}

calculator(num1,num2,operator);