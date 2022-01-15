const { users } = require("../users");
const { _filter, _identity } = require("../underscore");
// 2. 거르기 - filter
console.log(_filter(users, (user) => user.age > 30));
// 2-1. reject
// _filter는 참인 값만 가져온다면, _reject는 참을 제외한 값을 가져오는.
/*
function _negate(func) {
  return function (val) {
    return !func(val);
  };
}
*/
const _negate = (func) => (val) => !func(val);
const _reject = (data, predi) => _filter(data, _negate(predi));

console.log(_reject(users, (user) => user.age > 30));
// 2-2. compact
// truthy한 값만 가져오는 함수
// _filter()에서 참인 값만 가져오기 때문에 밑의 코드로도 충분.
const _compact = _filter(_identity);

console.log(_compact([1, 2, 0, false, null, {}]));
// 1, 2, {}이 출력되게
