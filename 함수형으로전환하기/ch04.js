const _each = (list, iter) => {
  list.forEach((el) => iter(el));
  return list;
};

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

// 5. 파이프라인 만들기(_reduce함수로 만듦)
// 5-1. _pipe
// 함수들을 인자로 받아서 함수로 연속적으로 실행하는 함수
// reduce함수를 좀 더 추상화한 함수
function _pipe() {
  const fns = arguments;
  return function (arg) {
    return _reduce(
      fns,
      function (arg, fn) {
        return fn(arg);
      },
      arg
    );
  };
}

const f1 = _pipe(
  function (a) {
    return a + 1;
  },
  function (a) {
    return a + 2;
  },
  function (a) {
    return a + a;
  }
);
console.log(f1(1));
// 5-2. _go
// 두번째부터 함수를 받는 함수로 _pipe에 즉시실행 함수
function _go() {
  let fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

_go(
  1,
  function (a) {
    return a + 1;
  },
  function (a) {
    return a + 2;
  },
  function (a) {
    return a + a;
  },
  console.log
);
// 5-3. users에 _go 적용
_go(
  users,
  function (users) {
    return _filter(users, function (users) {
      return users.age >= 30;
    });
  },
  function (users) {
    return _map(users, _get("name"));
  },
  console.log
);
// 5-4. 화살표 함수 간단히
_go2(
  users,
  _filter((user) => user.age < 30),
  _map(_get("age")),
  console.log
);
