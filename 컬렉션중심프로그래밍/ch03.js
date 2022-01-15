const { users } = require("../users");
const {
  _get,
  _go,
  _find,
  _findIndex,
  _some,
  _every,
} = require("../underscore");

// 3. 찾아내기 - find
// 3-1. _find
// 배열의 해당값 유무에 따라 true/false 리턴
console.log(
  _find(users, function (user) {
    return user.age < 30;
  })
);

console.log(
  _get(
    _find(users, function (user) {
      return user.age < 30;
    }),
    "name"
  )
);

// _go(
//   users,
//   _find(users, (user) => user.id === 3),
//   _get("name"),
//   console.log
// );
// 3-2. _findIndex
// 배열의 해당값의 인덱스를 리턴

console.log(
  _findIndex(users, function (user) {
    return user.id === 5;
  })
);

console.log(_findIndex(users, (user) => user.id === 20));
// 3-3. _some
// 조건에 하나라도 만족하는 값이 있다면 true, false
console.log(
  _some([1, 2, 5, 10, 20], function (val) {
    return val > 10;
  })
);

console.log(_some([1, 2, 5, 10, 20]));
console.log(_some([null, 0, false]));
console.log(_some(users, (user) => user.age < 20));
// 3-4. _every
// 모든 값이 조건에 만족하면 true : false
console.log(
  _every([1, 2, 5, 10, 20], function (val) {
    return val > 10;
  })
);

console.log(_every([1, 2, 5, 10, 20]));
console.log(_every([null, 0, false]));
