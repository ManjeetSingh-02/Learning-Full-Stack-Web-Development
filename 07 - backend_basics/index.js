// Working of wrapper function:
// The complete code is executed in a wrapper function by Node.js
// That wrapper function provides some global arguments:
// - module, exports, require, __filename, __dirname
// Every file in Node.js has access to these functions & variables in run time
function execute(exports, require, module, __filename, __dirname) {
    const fs = require('fs');
    fs.writeFile('./text.txt', 'Hello World!', () => console.log('Hi'));
}

// Working of __filename:
// __filename: gives the absolute path of the current module file
console.log(__filename); // /path/to/current/module/file.js

// Working of __dirname:
// __dirname: gives the directory name of the current module file
console.log(__dirname); // /path/to/current/module

// The require functions works like:
// function requre(moduleName) {}
// If pathName is an absolute path like "./module.js", it will look for the file from the given path to load it
// If pathName starts with a package name like "fs", it will look for that package in `node_modules` folder to load it
// The require function will return the exports object from the loaded module

// Working of exports:
// By default, exports is an empty object like: exports = {};
// To export something from module, we can add properties to the exports object
// exports is used for named export of multiple functions/variables from a module
function test() {} // in a file named as module.js
exports.testing = test; // named export
const { testing } = require("./module.js"); // named import of testing function
testing();

// Working of module:
// module is an object representing the current module
// module has a property named exports which is same as exports variable
// module.exports = {} is same as exports = {}
// module.exports can be used for default export of a single function/variable from a module
function add(x, y) { return x + y; } // in a file named as math.js
function sub(x, y) { return x - y; } // in a file named as math.js
function mul(x, y) { return x * y; } // in a file named as math.js
function div(x, y) { return x / y; } // in a file named as math.js
module.exports = { add, sub, mul, div }; // default export
const math = require("./math.js"); // default import of all functions as an object
console.log(math.add(1, 2));
console.log(math.sub(3, 2));
console.log(math.mul(5, 2));
console.log(math.div(10, 2));