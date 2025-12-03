import fs from "fs";

function readFilePromise(filePath, encoding) {
  return new Promise((res, rej) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
}

function writeFilePromise(filePath, data) {
  return new Promise((res, rej) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) rej(err);
      else res();
    });
  });
}

function deleteFilePromise(filePath) {
  return new Promise((res, rej) => {
    fs.unlink(filePath, (err) => {
      if (err) rej(err);
      else res();
    });
  });
}

function wait(seconds) {
  return new Promise((resolve, rej) => {
    setTimeout(() => resolve(), seconds * 1000);
  });
}

// --------------------------------
// ASYNC/AWAIT - used to run the async code in a sync manner
// - Async: used to declare a function as asynchronous
// - Await: used to wait for a promise to resolve/reject and return the resolved value or throw the rejected error
// --------------------------------

// --------------------------------
// EXAMPLE:
// await readFilePromise("hello.txt", "utf-8")
// Above line will behave same like readFilePromise("hello.txt", "utf-8").then().catch()
// --------------------------------

// --------------------------------
// TRY/CATCH/FINALLY with ASYNC/AWAIT
// - Try: used to wrap the code that may throw an error
// - Catch: used to handle the error thrown in the try block
// - Finally: used to execute code after try/catch regardless of the outcome
// --------------------------------
async function test() {
  try {
    const fileContent = await readFilePromise("hello.txt", "utf-8");
    await writeFilePromise("backup.txt", fileContent);
    await wait(5);
    await deleteFilePromise("hello.txt");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Done");
  }
}
test();
