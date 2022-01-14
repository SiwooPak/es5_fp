const { users } = require("../users");
const {
  _each,
  _filter,
  _map,
  _keys,
  _values,
  _pluck,
} = require("../underscore");
// 2. 거르기 - filter
console.log(_filter(users, (user) => user.age > 30));
// 2-1. reject
// _filter는 참인 값만 가져온다면, _reject는 참을 제외한 값을 가져오는.
// 2-2. compact
