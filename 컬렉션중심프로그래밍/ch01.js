const {
  _each,
  _filter,
  _map,
  _keys,
  _values,
  _pluck,
} = require("../underscore");
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
// 1. 수집하기 - map
console.log(_map(users, (user) => user.name));
// 1-1. values
// 데이터의 타입인 경우 object 타입에 유용함
/*
function _values(data) {
  return _map(data, function (val) {
    return val;
  });
}
*/

console.log(_keys(users[0]));
console.log(_values(users[0]));
// 1-2. pluck
// 해당하는 키의 값들만 가져오는 함수
// _pluck(users, 'age');
// [33, 22, 11]
/*
const _pluck = (data, key) => {
  return _map(data, function (obj) {
    return obj[key];
  });
};
*/

console.log(_pluck(users, "age"));
console.log(_pluck(users, "name"));
console.log(_pluck(users, "id"));


