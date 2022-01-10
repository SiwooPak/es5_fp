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

// 기존 코드 최적화
const users = [
  { id: 1, name: "ID", age: 36 },
  { id: 2, name: "BJ", age: 32 },
  { id: 3, name: "JM", age: 32 },
  { id: 4, name: "PJ", age: 27 },
  { id: 5, name: "HA", age: 25 },
  { id: 6, name: "JE", age: 26 },
  { id: 7, name: "JI", age: 31 },
  { id: 8, name: "MP", age: 23 },
];

const _filter = (lists, predi) => {
  const new_list = [];
  lists.forEach((el) => {
    if (predi(el)) new_list.push(el);
  });
  return new_list;
};

const _each = (list, iter) => {
  list.forEach((el) => iter(el));
  return list;
};

const _map = (lists, mapper) => {
  const new_list = [];
  _each(lists, (val) => {
    new_list.push(mapper(val));
  });
  return new_list;
};

const result = _map(
  _filter(users, (user) => user.age < 30),
  _get2("name")
);
console.log("result: " + result);

const result2 = _map(
  _filter(users, (user) => user.age >= 30),
  _get2("age")
);
console.log("result2: " + result2);
