//----------------------------------------
// DEBOUNCING: a technique to delay the execution of a function until after a certain amount of time has passed since it was last invoked
// if a user is clicking the login button multiple times, this concept ensures that the last login request is the only one that gets processed after a certain delay
// if a delay is active and the user clicks again, the previous delay is cleared and a new delay starts
//----------------------------------------

//----------------------------------------
// HIGHER ORDER FUNCTION: a function that takes another function as an argument or returns a child function as its result
//----------------------------------------

//----------------------------------------
// CLOSURE: when a child function that is returned from a parent function and the child function has access to the variables of the parent function even after the parent function has finished executing
//----------------------------------------


function f1(fn, delay) {
  let myId = null;
  return function (...args) {
    clearTimeout(myId);
    myId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Execution of f1 function:
// 1. f1 has 2 parameters: fn (a function) and delay (a number in milliseconds).
// 2. Inside f1, a variable myId is initialized to null. This variable will hold the ID of the setTimeout fn.
// 3. f1 returns an inner function (child function) that takes any number of arguments (...args).
// 4. child function clears any previously setTimeout calls using clearTimeout(myId).
// 5. Then it sets a new timeout using setTimeout, which will call the fn function after the specified delay
// 6. Due to apply(this, args), the new fn have access to the arguments and context of the child function when it is eventually called after the delay.

function greet(msg) {
  console.log(msg);
}

const x = f1((msg) => greet(msg), 3000);

x("Hi 1");
x("Hi 2");
x("Hi 3");
// only "Hi 3" will be printed after 3 seconds
