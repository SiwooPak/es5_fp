const _each = (list, iter) => {
  list.forEach((el) => iter(el));
  return list;
};
// _reduce 만들기
const slice = Array.prototype.slice;

function _rest(list, num) {
  return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
  if (arguments.length === 2) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, function (val) {
    memo = iter(memo, val);
  });
  return memo;
}

// 1.
_reduce(
  [1, 2, 3],
  function (a, b) {
    return a + b;
  },
  0
);

// 2.
const _curry = (fn) =>
  function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(a, b);
  };

const add = _curry(function (a, b) {
  return a + b;
});

console.log(_reduce([1, 2, 3], add, 2));
console.log(_reduce([1, 2, 3], add));

const arrayLike = { 0: 1, 1: 20, 2: 30, length: 3 };
