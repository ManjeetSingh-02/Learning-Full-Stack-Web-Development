// -------------------------------------
// THROTTLING: a technique which ensures that a function is only called once within a specified time frame
// if a user is clicking the login button multiple times, this concept ensures that the first login request is the only one that gets processed in that time frame
// if the user requests again within a specified time frame (delay), those subsequent requests are ignored
// -------------------------------------

const f1 = (fn, delay) => {
  let myId = null;

  return (...args) => {
    if (myId === null) {
      fn(...args);
      myId = setTimeout(() => (myId = null), delay);
    }
  };
};

// Execution of f1 function:
// 1. f1 has 2 parameters: fn (a function) and delay (a number in milliseconds).
// 2. Inside f1, a variable myId is initialized to null. This variable will hold the ID of the setTimeout fn.
// 3. f1 returns an inner function (child) that takes any number of arguments (...args)
// 4. child function checks if myId is null
// 5. If myId is null, it calls the fn function with the provided arguments (...args) and sets myId to a new setTimeout fn
// 6. New setTimeout fn will reset myId to null after the specified delay time
// 7. During the delay time, any subsequent requests to the child function will be ignored because myId is not null
// 7. After the delay time has passed, myId is reset to null, allowing future requests
// 8. This ensures that fn is only called once within the specified delay time frame

const x = f1(msg => console.log(msg), 3000);
x("Hello 1");
x("Hello 2");
x("Hello 3");
// only "Hello 1" will be printed immediately, "Hello 2" and "Hello 3" will be ignored
