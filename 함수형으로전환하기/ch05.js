const { _each, _filter, _map, _go } = require("../underscore");
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
// 6. _each의 외부 다형성 높이기
// 6-1. _each에 null 넣어도 에러 안 나게

/*
_get()를 통해 null인 경우에도 대응할수 있게
const _length = _get("length");

const _each = function (list, iter) {
  for (let i = 0, len = _length(list); i < len; i++) {
    iter(list[i]);
  }
  return list;
};
// 결과적으로 배열이 아니거나 빈배열인 경우 []을 리턴
*/

_each(null, console.log);
console.log(_filter(null, (v) => v));
console.log(_map(null, (v) => v));

// 6-2. _keys 만들기
// 6-3. _keys에서도 object인지 검사하여 null 에러 안나게
console.log(Object.keys({ name: "ID", age: 30 }));
console.log(Object.keys([1, 2, 3, 4]));
console.log(Object.keys(10));
//console.log(Object.keys(null));

const _isObject = (obj) => typeof obj === "object" && !!obj;
const _keys = (obj) => (_isObject(obj) ? Object.keys(obj) : []);
console.log(_keys({ name: "ID", age: 30 }));
console.log(_keys([1, 2, 3, 4]));
console.log(_keys(10));
console.log(_keys(null));

// 6-4. _each 외부 다형성 높이기
_each(
  {
    13: "ID",
    19: "HD",
    29: "YD",
  },
  function (name) {
    console.log(name);
  }
);

console.log(
  _map(
    {
      13: "ID",
      19: "HD",
      29: "YD",
    },
    (name) => name.toLowerCase()
  )
);

_go(
  {
    13: "ID",
    19: "HD",
    29: "YD",
  },
  _map((name) => name.toLowerCase()),
  console.log
);

_go(
  {
    1: users[0],
    3: users[2],
    5: users[4],
  },
  _map((user) => user.name.toLowerCase()),
  console.log
);
