// PROXY - this creates a proxy for an object, allowing to define custom behavior and operations on the object
// the proxied object always points to the address of the original object, so any changes made to the proxied object will also reflect in the original object

// a proxy to handle negative indexing in arrays
function proxiedArr(arr) {
  return new Proxy(arr, {
    // target -> it holds the address of the original object
    get(target, index) {
      index = Number(index);
      if (index >= 0) return target[index];
      else return target[target.length + index];
    },
    set(target, index, value) {
      index = Number(index);
      if (index >= 0) target[index] = value;
      else target[target.length + index] = value;
      return true;
    },
  });
}

let arr = [1, 2, 3, 4];
let newArr = proxiedArr(arr);

// Accessing elements using positive and negative indexes
console.log(newArr[3]);
console.log(newArr[-1]);

// arr and newArr point to same reference, so any changes that are made by proxy will also reflect in arr
newArr[-1] = 5;
console.log(newArr[-1]);

// to prevent the change in original object, we can create a copy of the original object
// copy can be of 2 types:
// shallow copy - [...obj]
// deep copy - JSON.parse(JSON.stringify(obj))
let copyArr = proxiedArr([...arr]);