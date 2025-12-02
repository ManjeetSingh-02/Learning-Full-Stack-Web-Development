let nothing = null;
console.log(typeof nothing); // Object

let notDefined = undefined;
console.log(typeof notDefined); // Undefined

let symbolVar = Symbol();
console.log(typeof symbolVar); // Symbol

let aNum = '42a';
let convertedNum = Number(aNum);
console.log(convertedNum); // NaN
console.log(typeof convertedNum); // Number

let bNum = '42';
let convertedNum2 = +bNum;
console.log(convertedNum2); // 42
console.log(typeof convertedNum2); // Number

let cNum = '34';
let parsedNum = parseInt(cNum);
console.log(parsedNum); // 34
console.log(typeof parsedNum); // Number

let dNum = '34a';
let parsedNum2 = parseInt(dNum);
console.log(parsedNum2); // 34
console.log(typeof parsedNum2); // Number

let eNum = 'a34';
let parsedNum3 = parseInt(eNum);
console.log(parsedNum3); // NaN
console.log(typeof parsedNum3); // Number

let message = 'Hello World';
console.log(message.length);
console.log(message.toUpperCase());
console.log(message.indexOf('World'));
console.log(message.slice(0, 5));

console.log(Math.random() * 6 + 1);

if (!String.prototype.myIndexOf) {
  String.prototype.myIndexOf = function (element) {
    for (let i = 0; i < this.length; i++) {
      if (element[0] === this[i]) {
        let found = true;
        for (let j = 1; j < element.length; j++) {
          if (element[j] !== this[i + j]) {
            found = false;
            break;
          }
        }
        if (found) return i;
      }
    }
  };
}

console.log(message.myIndexOf('World'));

function check(v) {
  if (v) console.log(`${v}: Truthy`);
  else console.log(`${v}: Falsy`);
}

check(0);
check('0');
check('');
check(' ');
check([]);
check({});
check(NaN);
check(null);
check(undefined);
check(true);
check(false);
check(1);
check(-1);
check(Infinity);
check(-Infinity);
check(10 / 0);
check(10 / 'a');
check(10 / '5');
check(10 / '0');
check(10 / ' ');
check(10 / '');
check(10 / null);
check(10 / undefined);
check(10 / NaN);
check(10 / []);
check(10 / {});
check(10 / true);
check(10 / false);
check(10 / 1);
check(10 / -1);
check(10 / Infinity);
check(10 / -Infinity);
check(10 / 10);
check(10 / -10);
check(10 / 0);
check(10 / -0);
