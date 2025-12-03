import fs from "fs";

// -------------------------------
// CALLBACK HELL:
// - each operation depends on the previous one
// - to resolve callback hell we can use promises, async/await
// -------------------------------

// -------------------------------
// EXAMPLE:
// - Read contents of "hello.txt"
// - Create "backup.txt"
// - Write contents of "hello.txt" into "backup.txt"
// - Delete "hello.txt"
// -------------------------------

function cbHell() {
  fs.readFile("./hello.txt", "utf8", (err, fileContents) => {
    if (err) {
      console.log("Error reading hello.txt file: " + err);
    } else {
      console.log("Successfully read hello.txt file");
      fs.writeFile("./backup.txt", fileContents, (err) => {
        if (err) {
          console.log('Error writing backup.txt file: ' + err);
        } else {
          console.log('Successfully wrote backup.txt file');
          fs.unlink("./hello.txt", (err) => {
            if (err) {
              console.log('Error deleting hello.txt file: ' + err);
            } else {
              console.log('Successfully deleted hello.txt file');
            }
          });
        }
      });
    }
  });
}

cbHell();
