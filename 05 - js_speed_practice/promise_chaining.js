import fs from "fs/promises";

// --------------------------------------
// PROMISE CHAINING
// - in this we chain multiple .then() calls till the final result is achieved
// - each .then() receives the result of the previous .then()
// - if any promise in the chain is rejected, the control jumps to the nearest .catch()
// - .finally() is executed at the end regardless of the outcome
// This multiple .then() chaining can lead to "callback hell" like structure known as "Promise Hell"
// To resolve the PROMISE HELL, we can use async/await
// --------------------------------------

// -------------------------------
// EXAMPLE:
// - Read contents of "hello.txt"
// - Create "backup.txt"
// - Write contents of "hello.txt" into "backup.txt"
// - Delete "hello.txt"
// -------------------------------
fs.readFile("./hello.txt", "utf8")
  .then((data) => fs.writeFile("./backup.txt", data))
  .then(() => fs.unlink("./hello.txt"))
  .catch((err) => console.log(err))
  .finally(() => console.log("finally"));

