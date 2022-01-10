// 1. 커링
// 1-1. _curry, _curryr
function _curry(fn) {
  return function (a) {
    return function (b) {
      return fn(a, b);
    };
  };
}
let add = function (a, b) {
  return a + b;
};

let add2 = _curry(function (a, b) {
  return a + b;
});

console.log(add(5, 10));
let add10 = add2(10);
console.log(add10(5));
console.log(add2(5)(3));

const _curry2 = (fn) =>
  function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(a, b);
  };

let add3 = _curry2(function (a, b) {
  return a + b;
});
console.log(add3(2, 5));

const sub = _curry2((a, b) => a - b);
console.log(sub(8, 5));

const _curryr = (fn) =>
  function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(b, a);
  };

const sub2 = _curryr((a, b) => a - b);
const sub10 = sub2(10);
console.log(sub10(5));

// 1-2. _get만들어 좀 더 간단하게 하기
function _get(obj, key) {
  return obj === null ? undefined : obj[key];
}

const user1 = { id: 1, name: "ID", age: 36 };
console.log(user1.name);
console.log(_get(user1, "name"));

const _get2 = _curryr(function (obj, key) {
  return obj === null ? undefined : obj[key];
});
console.log(_get2("name")(user1));

const get_name = _get2("name");
console.log(get_name(user1));

const user2 = { id: 2, name: "BJ", age: 32 };
console.log(get_name(user2));
