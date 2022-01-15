// function _curry(fn) {
//     return function (a) {
//       return function (b) {
//         return fn(a, b);
//       };
//     };
// }
const _curry = function (fn) {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(a, b);
  };
};

const _curryr = function (fn) {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(b, a);
  };
};
// function _get(obj, key) {
//   return obj === null ? undefined : obj[key];
// }

const _get = _curryr((obj, key) =>
  obj === null ? undefined : obj[key]
);

// const _map = (lists, mapper) => {
//   const new_list = [];
//   lists.forEach((list) => {
//     new_list.push(mapper(list));
//   });
//   return new_list;
// };
const _isObject = (obj) => typeof obj === "object" && !!obj;
const _keys = (obj) => (_isObject(obj) ? Object.keys(obj) : []);

const _length = _get("length");

const _each = function (list, iter) {
  const keys = _keys(list);
  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[[i]]]);
  }
  return list;
};

const _filter = _curryr((lists, predi) => {
  const new_list = [];
  _each(lists, (val) => {
    if (predi(val)) new_list.push(val);
  });
  return new_list;
});

const _map = _curryr((lists, mapper) => {
  const new_list = [];
  _each(lists, (val) => {
    new_list.push(mapper(val));
  });
  return new_list;
});

const slice = Array.prototype.slice;

const _rest = (list, num) => slice.call(list, num || 1);

const _reduce = function (list, iter, memo) {
  if (arguments.length === 2) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, function (val) {
    memo = iter(memo, val);
  });
  return memo;
};

const _add = _curry((a, b) => a + b);

const _pipe = function () {
  const fns = arguments;
  return function (arg) {
    return _reduce(fns, (arg, fn) => fn(arg), arg);
  };
};

const _go = function (arg) {
  const fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
};

const _identity = (val) => val;
const _values = (data) => _map(_identity)(data);

const _pluck = (data, key) => _map(data, _get(key));

const _negate = (func) => (val) => !func(val);
let _reject = (data, predi) => _filter(data, _negate(predi));
_reject = _curryr(_reject);
const _compact = _filter(_identity);

const _find = _curryr((list, predi) => {
  let keys = _keys(list);

  for (let i = 0, len = keys.length; i < len; i++) {
    let val = list[keys[i]];
    if (predi(val)) return val;
  }
});

const _findIndex = _curryr((list, predi) => {
  const keys = _keys(list);

  for (let i = 0, len = keys.length; i < len; i++) {
    if (predi(list[keys[i]])) return i;
  }
  return -1;
});

const _some = (data, predi) =>
  _findIndex(data, predi || _identity) !== -1;

const _every = (data, predi) =>
  _findIndex(data, _negate(predi || _identity)) === -1;

const _min = (data) => _reduce(data, (a, b) => (a < b ? a : b));
const _max = (data) => _reduce(data, (a, b) => (a > b ? a : b));

const _minBy = _curryr((data, iter) =>
  _reduce(data, (a, b) => (iter(a) < iter(b) ? a : b))
);
const _maxBy = _curryr((data, iter) =>
  _reduce(data, (a, b) => (iter(a) > iter(b) ? a : b))
);

const _push = (obj, key, val) => {
  (obj[key] = obj[key] || []).push(val);
  return obj;
};
const _groupBy = _curryr((data, iter) =>
  _reduce(data, (grouped, val) => _push(grouped, iter(val), val), {})
);
const _head = (list) => list[0];

const _inc = (count, key) => {
  count[key] ? count[key]++ : (count[key] = 1);
  return count;
};
const _countBy = _curryr((data, iter) => {
  return _reduce(data, (count, val) => _inc(count, iter(val)), {});
});

const _pairs = _map((key, val) => [key, val]);

module.exports = {
  _curry,
  _curryr,
  _min,
  _max,
  _minBy,
  _maxBy,
  _some,
  _every,
  _find,
  _findIndex,
  _compact,
  _reject,
  _negate,
  _identity,
  _values,
  _pluck,
  _pipe,
  _go,
  _add,
  _reduce,
  _map,
  _filter,
  _each,
  _keys,
  _isObject,
  _get,
  _push,
  _groupBy,
  _head,
  _inc,
  _countBy,
  _pairs,
};
