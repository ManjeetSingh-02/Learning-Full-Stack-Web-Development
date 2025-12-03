let user = {
  username: "John",
  age: 22,
  password: "123",
};

let proxiedUser = new Proxy(user, {
  get(target, prop) {
    if (prop === "password") return "Access not given";
    else return target[prop];
  },
  set(target, prop, value) {
    if (prop === "password") console.log("You cannot change the password");
    else target[prop] = value;
    return true; // Indicate success
  },
});

proxiedUser.username = "Jane";
proxiedUser.password = "456";
proxiedUser.age = 23;

console.log(proxiedUser.username);
console.log(proxiedUser.password);
console.log(proxiedUser.age);
