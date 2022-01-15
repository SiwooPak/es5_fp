const { users } = require("../users");
const {
  _get,
  _min,
  _max,
  _minBy,
  _maxBy,
  _go,
  _filter,
  _reject,
  _groupBy,
  _pipe,
  _countBy,
  _map,
  _pairs,
} = require("../underscore");

// 4. 접기 - reduce
// 4-1. _min, _max, _minBy, _maxBy

console.log(_min([1, 2, 4, 10, 5, -4]));
console.log(_max([1, 2, 4, 10, 5, -4]));

// _minBy, _maxBy: 어떤 조건을 통해서 비교할 것인가를 통해 추가적으로 iterate를 받음.

console.log(_minBy([1, 2, 4, 10, 5, -20], Math.abs));
console.log(_maxBy([1, 2, 4, 10, 5, -20], Math.abs));

const maxAge = _maxBy(users, (user) => user.age);
console.log(maxAge);

_go(
  users,
  _filter((user) => user.age >= 30),
  _minBy((user) => user.age),
  console.log
);

_go(
  users,
  _filter((user) => user.age >= 30),
  _minBy((user) => user.age),
  _get("name"),
  console.log
);

_go(
  users,
  _filter((user) => user.age >= 30),
  _minBy(_get("name")),
  console.log
);

_go(
  users,
  _reject((user) => user.age >= 30),
  _maxBy(_get("age")),
  console.log
);
console.clear();
// 4-2. _groupBy, _push

console.log(_groupBy(users, (user) => user.age));
_go(
  users,
  _groupBy((user) => user.age - (user.age % 10)),
  console.log
);

const _head = (list) => list[0];

_go(users, _groupBy(_pipe(_get("name"), _head)), console.log);

// 4-3. _countBy, _inc

console.log(_countBy(users, (user) => user.age - (user.age % 10)));

_go(
  users,
  _countBy((user) => user.name[0]),
  console.log
);

console.log(_pairs(users[0]));

const _documentWrite = document.write.bind(document);

_go(
  users,
  _filter((user) => user.age >= 20),
  _countBy((user) => user.age - (user.age % 10)),
  _map((count, key) => `${key}대는 ${count}명 입니다.`),
  (list) => "<ul>" + list.join("") + "</ul>",
  _documentWrite
);

const f1 = _pipe(
  _countBy((user) => user.age - (user.age % 10)),
  _map((count, key) => `${key}대는 ${count}명 입니다.`),
  (list) => "<ul>" + list.join("") + "</ul>",
  _documentWrite
);

_go(
  users,
  _reject((user) => user.age < 20),
  f1
);

_go(
  users,
  _filter((user) => user.age < 20),
  f1
);
