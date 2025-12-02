setTimeout(() => console.log("A"), 8 * 1000);
// The 8s timer states that minimum delay to execute a code is 8s, after 8s the event loop will check if the call stack is empty, if it is, then the callback will be executed, else it will wait till the call stack is empty




console.log('HI');
setTimeout(() => console.log('Timeout fn'), 5000);
console.log('BYE');
// After 5 seconds, "Timeout fn" will be logged to the console

console.log('HI 2');
setTimeout(() => console.log('Timeout fn 2'), 0);
console.log('BYE 2');
// "Timeout fn 2" will be logged after "BYE 2" because the call stack won't be empty until the synchronous code is done executing

setTimeout(() => console.log('Timeout fn 3'), 8 * 1000);
// while (true) {
//   console.log('Loop call');
// }
// In this case, "Timeout fn 3" will be logged only after the loop is terminated (which is never in this case), because the call stack is always busy with the synchronous code




const obj = {
    fName: "John",
    fn: function() {
        console.log(this.fName);
    }
}
console.log("Heeeeee 1");
obj.fn(); // here `this` refers to `obj`, so it will log "John"
console.log("Heeeeee 2");




console.log("Heeeeee 3");
setTimeout(obj.fn, 5 * 1000);
console.log("Heeeeee 4");
// In this case:
// 1: obj loaded into memory
// 2: Heeeeee 3 will be logged immediately
// 3: the setTimeout callback will be added to the callback queue after 5 seconds
// 4: Heeeeee 4 will be logged immediately
// 5: after 5s, the function call will be moved from the callback queue to the call stack, causing the console.log to execute but as the obj is removed from memory, "this" will lose its context and will log "undefined"

// To fix the above issue, we can use bind to bind the context of `this` to `obj`
setTimeout(obj.fn.bind(obj), 5 * 1000);
// Now, after 5s, "John" will be logged to the console because we have bound the context of `this` to `obj`




console.log("HELLO");
setTimeout(() => (console.log("Timeout log 1")), 0);
Promise.resolve().then(() => console.log("Promise log"));
setTimeout(() => (console.log("Timeout log 2")), 0);
console.log("BYEE");
// The order of logs will be:
// HELLO
// BYEE
// Promise log
// Timeout log 1
// Timeout log 2
// This is because there are two queues: the microtask queue and the callback queue
// Microtask queue has higher priority than the callback queue
// Promise callbacks --> microtask queue and setTimeout callbacks --> callback queue
// Execution order:
// 1: Print HELLO
// 2: Timeout log 1 goes to callback queue
// 3: Promise log goes to microtask queue
// 4: Timeout log 2 goes to callback queue
// 5: Print BYEE
// 6: Call stack is empty, microtask queue is checked first, so Promise log is printed
// 7: Call stack is empty again, microtask queue is checked again but this time its empty, so callback queue is checked and so Timeout log 1 is printed
// 8: Call stack is empty again, microtask queue is checked again but this time its empty, so callback queue is checked and so Timeout log 2 is printed





// ----------------------------------------
// STARVATION
// ----------------------------------------
setTimeout(() => console.log("Timeout fn"), 0);
Promise.resolve().then(() => {
    console.log("Promise 1");
    Promise.resolve().then(() => {
        console.log('Promise 2');
        Promise.resolve().then(() => {
          console.log('Promise 3');
        });
        // this promise logging continiues infinite times
    });
})
// Execution order:
// 1: Timeout fn goes to callback queue
// 2: Promise 1 goes to microtask queue
// 3: Call stack is empty, microtask queue is checked first, so Promise 1 is printed
// 4: Promise 2 goes to microtask queue
// 5: Call stack is empty, microtask queue is checked again, so Promise 2 is printed
// 6: Promise 3 goes to microtask queue
// 7: Call stack is empty, microtask queue is checked again, so Promise 3 is printed
// If this is infinite, the Timeout fn will never get a chance to execute because the microtask queue will never be empty, causing starvation of the callback queue



// ----------------------------------------
// GLOBAL EXECUTION CONTEXT
// - JS creates a GEC for the entire code file
// - First 2 phases are created: Memory Creation Phase & Code Execution Phase
// - Memory Creation Phase: variables and functions decalarations are stored in memory
// - Code Execution Phase: code is executed line by line
// ----------------------------------------


// ----------------------------------------
// HOISTING - js process in which declarations are appeared to be moved to top of their scope before execution phase
// ----------------------------------------

// - Variables by "var" are hoisted but they are declared as "UNDEFINED"
console.log(age); // due to hoisting as age is declared as undefined at memory phase
var age = 25; // age has value 25 assigned to it
console.log(age); // 25

// - functions are also hoisted but they are stored in memory with their entire definition (body is also hoisted), so they can be called before their declaration
testHoistFunc(); // "Hoisted Function called" as the entire function is hoisted
function testHoistFunc() {
    console.log("Hoisted Function called");
}

// This will behave as variable and will be hoisted as undefined
hoistVar(); // TypeError: hoistVar is not a function
var hoistVar = function () {
    console.log("Hoisted Variable Function");
}
hoistVar(); // "Hoisted Variable Function" as function is hoisted like a variable

// ----------------------------------------
// TEMPORAL DEAD ZONE - variables are in the scope (they are declared) but cannot be accessed until they are initialized
// ----------------------------------------

// - Variables by "let/const" are also hoisted but they are in "TEMPORAL DEAD ZONE", blocking access and throwing ReferenceError: cannot access before initialization
// in this, the declaration and initialization both happen at same time
console.log(age2); // ReferenceError: cannot access 'age2' before initialization because age2 is in TDZ
let age2 = 25; // age2 has value 25 assigned to it
console.log(age2); // 25