// ----------------------------------------
// CALL: method is invoked to immediately call a function with specified context
// ----------------------------------------

// ----------------------------------------
// BIND: method is invoked to bound the function with specified context and return it as a new function, which can be called later
// ----------------------------------------

// ----------------------------------------
// APPLY: method is invoked to call a function immediately with specified context but it can also takes some arguments to pass to the function
// ----------------------------------------


let p1 = {
  n: "abc",
  g: function () {
    console.log(this.n);
  },
};

let p2 = {
  n: "xyz",
};

p1.g(); // call the function `g` with `p1` as a context

p1.g.call(p2); // automatic call the function `g` with `p2` as a context

const fn = p1.g.bind(p2); // bind the function `g` with `p2` as a context
fn(); // call the binded function

p1.g.bind(p2)(); // bind the function `g` with `p2` as a context and call it automatically

let p3 = {
  n: 123,
  fn: function (...args) {
    console.log(this.n);
    console.log(...args);
  }
}

p3.fn([1, 2, 3]); // call the function `fn` with `p3` as a context and arguments

p3.fn.apply(p2, [4, 5, 6]); // bind the function `fn` with `p2` as context and call it with arguments
