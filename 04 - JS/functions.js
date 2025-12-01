Function.prototype.describe = function () {
    console.log(`Called By: ${this.name}`);
}

function greet(name) {
    console.log(`Hello ${name}!`);
}

greet("XYZ"); // Hello XYZ!
greet.describe(); // Called By: greet because `this` -> function who is calling describe

// function declaration
function sum(a, b) {
    return a + b;
}

// function expression
const sub = function (a, b) {
    return a - b;
}

// arrow function
const multiply = (a, b) => a * b;

// first class function
function operate(a, b, operation) {
    return operation(a, b);
}
console.log(operate(4, 2, (x, y) => x / y));

// tiffin-box concept - in this case, the outerFunction returns the innerFunction which has access to the variables of outerFunction due to closure even after outerFunction has finished execution
function outerFunction() {
  let secret = "ssddcc"; // variable created in outerFunction but accessible in innerFunction due to closure

  // returning a complete new function having access to outerFunction's variables
  return function innerFunction() {
    return secret;
  };
}
const getSecret = outerFunction(); // getSecret now holds the innerFunction
console.log(`Secret is: ${getSecret()}`); // Secret is: ssddcc because getSecret() innerFunction has access to secret variable due to closure 

// IIFE - Immediately Invoked Function Expression
(function() {
    console.log("This function runs itself immediately after its creation!");
})();