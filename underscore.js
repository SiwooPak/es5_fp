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

exports._get = _curryr((obj, key) =>
  obj === null ? undefined : obj[key]
);

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
exports._keys = (obj) => (_isObject(obj) ? Object.keys(obj) : []);

const _length = _get("length");
exports._each = function (list, iter) {
  const keys = _keys(list);
  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[[i]]]);
  }
  return list;
};

const _each = function (list, iter) {
  const keys = _keys(list);
  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[[i]]]);
  }
  return list;
};

const _filter1 = function (lists, predi) {
  const new_list = [];
  _each(lists, (val) => {
    if (predi(val)) new_list.push(val);
  });
  return new_list;
};

const _map1 = function (lists, mapper) {
  const new_list = [];
  _each(lists, (val) => {
    new_list.push(mapper(val));
  });
  return new_list;
};

exports._map = _curryr(_map1);
exports._filter = _curryr(_filter1);

const _map = _curryr(_map1);
const _filter = _curryr(_filter1);

const slice = Array.prototype.slice;

function _rest(list, num) {
  return slice.call(list, num || 1);
}

exports._reduce = function (list, iter, memo) {
  if (arguments.length === 2) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, function (val) {
    memo = iter(memo, val);
  });
  return memo;
};

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

exports.add = _curry((a, b) => a + b);

exports._pipe = function () {
  const fns = arguments;
  return function (arg) {
    return _reduce(fns, (arg, fn) => fn(arg), arg);
  };
};

const _pipe = function () {
  const fns = arguments;
  return function (arg) {
    return _reduce(fns, (arg, fn) => fn(arg), arg);
  };
};

exports._go = function (arg) {
  const fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
};

exports._identity = (val) => val;
const _identity = (val) => val;
// const _values = (data) => _map(data, _identity);
exports._values = (data) => _map(_identity)(data);

exports._pluck = (data, key) => _map(data, _get(key));
const _pluck = (data, key) => _map(data, _get(key));

const _negate = (func) => (val) => !func(val);
exports._negate = (func) => (val) => !func(val);
const _reject = (data, predi) => _filter(data, _negate(predi));
exports._reject = (data, predi) => _filter(data, _negate(predi));
const _compact = _filter(_identity);
exports._compact = _filter(_identity);

const _find = _curryr((list, predi) => {
  let keys = _keys(list);

  for (let i = 0, len = keys.length; i < len; i++) {
    let val = list[keys[i]];
    if (predi(val)) return val;
  }
});
exports._find = _curryr((list, predi) => {
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

exports._findIndex = _curryr((list, predi) => {
  const keys = _keys(list);

  for (let i = 0, len = keys.length; i < len; i++) {
    if (predi(list[keys[i]])) return i;
  }
  return -1;
});

exports._some = (data, predi) =>
  _findIndex(data, predi || _identity) !== -1;

exports._every = (data, predi) =>
  _findIndex(data, _negate(predi || _identity)) === -1;
