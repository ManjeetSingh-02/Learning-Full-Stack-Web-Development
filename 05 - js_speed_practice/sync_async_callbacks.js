import fs from 'fs';

// In asynchronous version:
// - Log "ASYNC Start"
// - Start reading the file asynchronously (in background)
// - Log "ASYNC End"
// - During the asynchronous read, if err: log the error else log the contents
console.log('ASYNC Start');
fs.readFile('./hello.txt', 'utf-8', (err, data) => {
  if (err) console.log(err);
  else console.log('ASYNC File Contents: ' + data);
});
console.log('ASYNC End');

// In synchronous version:
// - Log "SYNC Start"
// - Start reading the file synchronously
// - Wait for the file to be read and its contents to be stored in "fileContents"
// - Log the contents of the file
// - Log "SYNC End"
console.log('SYNC Start');
const fileContents = fs.readFileSync('./hello.txt', 'utf-8');
console.log('SYNC File Contents: ' + fileContents);
console.log('SYNC End');

// --------------------------------------------
// CALLBACKS
// --------------------------------------------

// Synchronous sum function
function sum1(a, b) {
  return a + b;
}
// Synchronous sum function call
// - Calculate sum of 1 and 2
// - Log 's1' and the result
// - Log 'After s1'
// This is a blocking code means logging 'After s1' won't be done until sum is calculated
console.log('s1', sum1(1, 2));
console.log('After s1');

// Asynchronous sum function with callback
function sum2(a, b, cb) {
  // Simulate a delay of 5 seconds before calling the callback with the sum
  setTimeout(() => cb(a + b), 5 * 1000);
}
// Asynchronous sum function call
// - Start calculating sum of 1 and 2 in background
// - Log 'After s2'
// - When sum is calculated, log 's2' and the result
// This is a non-blocking code means logging 'After s2' will be done immediately after calling sum2 and then the output of sum2 will be logged when the callback is executed
sum2(1, 2, res => console.log('s2', res));
console.log('After s2');
