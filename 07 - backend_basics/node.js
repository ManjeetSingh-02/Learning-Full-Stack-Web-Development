const fs1 = require('fs');
setTimeout(() => console.log('Timeout 1'), 0);
setImmediate(() => console.log('Immediate 1'));
console.log('Synchronous log');
// Output:
// Synchronous log
// Timeout after 0 ms
// Immediate after I/O events
const fs2 = require('fs');
setTimeout(() => console.log('Timeout 2'), 0);
setImmediate(() => console.log('Immediate 2'));
// Output:
// Immediate after I/O events
// Timeout after 0 ms



// NodeJS is `C++ v8 engine` + `libuv`(multi-platform C libaray which provides support for asynchronous I/O operations and Thread Pool) and it is a single threaded runtime environment
// A Node Process is created having Main Thread(execute JS code) and Thread Pool(execute CPU intensive tasks)


// Main Thread Execution Steps:
// Initialize Project
// Top Level Code Execution
//  - Require Statements
//  - Event Callbacks Register(Send something on /GET))
// Event Loop Start(it has multiple phases):
//  - Check for Expired Timer Callbacks(setTimeout, setInterval)
//  - I/O Polling Phase(run callbacks for any I/O operations like fs.functions(cb()) etc)
//  - Run all setImmediate Callbacks(setImmediate only exist in NodeJS)
//  - Run all Close Callbacks(ending callbacks like server.close(run this code) etc)
//  - If nothing is left, exit the process else go back to Event Loop first phase
const fs3 = require('fs');
setTimeout(() => console.log('Timeout 3'), 0);
setImmediate(() => console.log('Immediate 3'));
fs3.readFile('./text.txt', "utf-8", (err, data) => {
    setTimeout(() => console.log('Timeout inside fs'), 0);
    setImmediate(() => console.log('Immediate inside fs'));
})
console.log('Synchronous log');
// Output:
// 1) Top Level Code - Require fs and console.log - [Synchronous log]
// 2) setTimeout and setImmediate are registered
// 3) Read File is started in background using Thread Pool
// 4) Event Loop starts
// 4.1) Check for Expired Timer Callbacks - [Timeout 3] is executed
// 4.2) I/O Polling Phase - No I/O callbacks are present yet cuz file read is not yet completed
// 4.3) Run all setImmediate Callbacks - [Immediate 3] is executed
// 4.4) No close callbacks are present
// 4.5) Go back to Event Loop first phase as readfile tasks are still pending
// 4.6.1) Check for Expired Timer Callbacks - No timer callbacks are present
// 4.6.2) I/O Polling - Read File is completed, so its callback function is ready to be executed and inside that callback setTimeout and setImmediate are registered and immediately ready to be executed
// 4.6.3) Run all setImmediate Callbacks - [Immediate inside fs] is executed
// 4.6.4) No close callbacks are present
// 4.6.5) Go back to Event Loop first phase as setTimeout inside fs is also pending
// 4.6.6.1) Check for Expired Timer Callbacks - [Timeout inside fs] is executed
// 4.6.6.2) No I/O callbacks are present
// 4.6.6.3) No setImmediate callbacks are present
// 4.6.6.4) No close callbacks are present
// 4.6.6.5 ) Nothing is left, exit the process
// Final Output Order: Synchronous log, Timeout 3, Immediate 3, Immediate inside fs, Timeout inside fs

// Thread Pool Execution Steps:
// - If any CPU intensive task comes, then get a worker thread from Thread Pool and run the task in background
// - Once the task is done, return the worker thread to Thread Pool and push the callback of that task to Main Thread I/O Polling Phase to run it there
//  - By default it has 4 thread workers which works parallelly
//  - We can change the number of threads by changing the environment variable UV_THREADPOOL_SIZE
//  - process.env.UV_THREADPOOL_SIZE = 8;
// The CPU intensive tasks are like: crypto functions, zlib functions, fs functions etc run on thread and their performace may vary so it can't be predicted exactly so it's non-deterministic
const crypto = require('crypto');
function hashPassword() {
    const start = Date.now();

    crypto.pbkdf2('password', 'salt1', 100000, 1024, 'sha512', (err, data) => {
        console.log(`${Date.now() - start}ms : Hash 1`);
    })

    crypto.pbkdf2('password', 'salt1', 100000, 1024, 'sha512', (err, data) => {
        console.log(`${Date.now() - start}ms : Hash 2`);
    });

    crypto.pbkdf2('password', 'salt1', 100000, 1024, 'sha512', (err, data) => {
        console.log(`${Date.now() - start}ms : Hash 3`);
    });

    crypto.pbkdf2('password', 'salt1', 100000, 1024, 'sha512', (err, data) => {
        console.log(`${Date.now() - start}ms : Hash 4`);
    });

    crypto.pbkdf2('password', 'salt1', 100000, 1024, 'sha512', (err, data) => {
        console.log(`${Date.now() - start}ms : Hash 5`);
    });

    crypto.pbkdf2('password', 'salt1', 100000, 1024, 'sha512', (err, data) => {
        console.log(`${Date.now() - start}ms : Hash 6`);
    });
}
hashPassword();
// Output:
// 924ms : Hash 2
// 941ms : Hash 1
// 942ms : Hash 3
// 948ms : Hash 4
// 1805ms : Hash 6
// 1873ms : Hash 5
// Hash 5 and 6 took more time as all 4 threads were busy with first 4 hash functions
// Hash 5 and 6 has almost similar time in compare to rest 4 because workers run parallely so 2-1-3-4 run and have almost same time and then 5-6 run parallely and have almost same time