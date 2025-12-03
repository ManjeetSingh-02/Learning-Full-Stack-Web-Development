// polyfill - fallback code for older browsers implementing the new features
let arr = [1, 2, 3, 4];

if (!Array.prototype.myForEach) {
  Array.prototype.myForEach = function (cb) {
    for (let i = 0; i < this.length; i++) {
      cb(this[i], i, this);
    }
  };
}
arr.myForEach((e) => console.log(e));

if (!Array.prototype.myMap) {
  Array.prototype.myMap = function (cb) {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
      let res = cb(this[i], i, this);
      newArr.push(res);
    }
    return newArr;
  };
}
console.log(arr.myMap((e) => e * 3));

if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function (cb) {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
      let res = cb(this[i]);
      if (res) newArr.push(this[i]);
    }
    return newArr;
  };
}
console.log(arr.myFilter((e) => e > 2));

if (!Array.prototype.myReduce) {
  Array.prototype.myReduce = function (cb, initialValue = null) {
    if (this.length === 0 && initialValue === null) throw new TypeError('Array is empty with no initial value');

    if(this.length === 0) return initialValue;

    let acc = initialValue || this[0];
    let startIndex = initialValue ? 0 : 1;
    for (let i = startIndex; i < this.length; i++) {
      acc = cb(acc, this[i]);
    }
    return acc;
  };
}
console.log(arr.myReduce((acc, value) => acc + value));
console.log(arr.myReduce((acc, value) => acc + value, 2));

if (!Array.prototype.myIndexOf) {
  Array.prototype.myIndexOf = function (value, startIndex = 0) {
    for (let i = startIndex; i < this.length; i++) {
      if (this[i] === value) return i;
    }
    return -1;
  };
}
console.log(arr.myIndexOf(3));

if (!Array.prototype.myIncludes) {
  Array.prototype.myIncludes = function (value, startIndex = 0) {
    for (let i = startIndex; i < this.length; i++) {
      if (this[i] === value) return true;
    }
    return false;
  };
}
console.log(arr.myIncludes(3));
