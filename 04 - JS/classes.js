class Example {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const e1 = new Example("as");
const e2 = new Example("vc");

console.log(e1.getName());
console.log(e2.getName());

console.log(Example.prototype);
console.log(e1.__proto__);
console.log(e2.__proto__);
console.log(Example.prototype === e1.__proto__);
