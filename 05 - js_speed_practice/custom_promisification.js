import fs from "fs";

// -------------------------------
// PROMISIFICATION: wrapping callback-based functions into promises so that legacy code can be used with promises
// -------------------------------

// promisification of readFile function
function readFilePromise(filePath, encoding) {
  return new Promise((res, rej) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
}

// promisification of writeFile function
function writeFilePromise(filePath, data) {
  return new Promise((res, rej) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) rej(err);
      else res();
    });
  });
}

// promisification of unlink function
function deleteFilePromise(filePath) {
  return new Promise((res, rej) => {
    fs.unlink(filePath, (err) => {
      if (err) rej(err);
      else res();
    });
  });
}

// -------------------------------
// EXAMPLE (using the promisified functions):
// - Read contents of "hello.txt"
// - Create "backup.txt"
// - Write contents of "hello.txt" into "backup.txt"
// - Delete "hello.txt"
// -------------------------------
readFilePromise("hello.txt", "utf-8")
  .then((data) => writeFilePromise("backup.txt", data))
  .then(() => deleteFilePromise("hello.txt"))
  .catch((err) => console.log(err))
  .finally(() => console.log("File operations completed"));