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

// 1. 명령형 코드
// 1-1 30세 이상인 users를 거른다.
const temp_users = [];
users.forEach((user) => {
  if (user.age >= 30) temp_users.push(user);
});
console.log(temp_users);
// 1-2 30세 이상인 usersdml names를 수집한다.
const names = [];
temp_users.forEach((user) => {
  if (user.age >= 30) names.push(user.name);
});
console.log(names);
// 1-3 30세 미만인 users를 거른다.
const temp_users2 = [];
users.forEach((user) => {
  if (user.age < 30) temp_users2.push(user);
});
console.log(temp_users2);
// 1-4 30세 미만인 users의 ages를 수집한다.
const ages = [];
temp_users2.forEach((user) => {
  if (user.age < 30) ages.push(user.age);
});
console.log(ages);
// 2. _filter, _map으로 리팩토링
// 2-1 _filter
const _filter = (lists, predi) => {
  const new_list = [];
  lists.forEach((el) => {
    if (predi(el)) new_list.push(el);
  });
  return new_list;
};

console.log(
  _filter(users, function (user) {
    return user.age >= 30;
  })
);

console.log(
  _filter(users, function (user) {
    return user.age < 30;
  })
);

console.log(
  _filter([1, 2, 3, 4], function (num) {
    return num % 2;
  })
);

console.log(
  _filter([1, 2, 3, 4], function (num) {
    return !(num % 2);
  })
);

// 2-2 _map
const _map = (lists, mapper) => {
  const new_list = [];
  lists.forEach((list) => {
    new_list.push(mapper(list));
  });
  return new_list;
};

const over_30 = _filter(users, function (user) {
  return user.age >= 30;
});

const name_list = _map(over_30, function (user) {
  return user.name;
});

console.log(name_list);

const less_30 = _filter(users, function (user) {
  return user.age < 30;
});

const age_list = _map(less_30, function (user) {
  return user.age;
});

console.log("" + age_list);

// 2-3. 간단하게
const result1 = _map(
  _filter(users, function (user) {
    return user.age >= 30;
  }),
  function (user) {
    return user.name;
  }
);
console.log("result1: " + result1);
const result2 = _map(
  _filter(users, function (user) {
    return user.age < 30;
  }),
  function (user) {
    return user.age;
  }
);
console.log("result2: " + result2);
// 3. _each 만들기
// 3-1 _each로 _map, _filter 중복제거
const _each = (list, iter) => {
  list.forEach((el) => iter(el));
  return list;
};

const _map2 = (lists, mapper) => {
  const new_list = [];
  _each(lists, (val) => {
    new_list.push(mapper(val));
  });
  return new_list;
};

const result3 = _map2(
  _filter(users, function (user) {
    return user.age < 30;
  }),
  function (user) {
    return user.age;
  }
);
console.log("result3: " + result3);

// 3-2 외부다형성
// 3-2-1 array_like, arguments, document.queryselectorAll
console.log([1, 2, 3, 4].map((val) => val * 2));
console.log([1, 2, 3, 4].filter((val) => val % 2));
console.log(document.querySelectorAll("*"));
// document.querySelectorAll()의 리턴값은 nodelist. arraylike 객체로
// array가 아니기 때문에 map. filter 메서드를 사용할 수 없음
// 하지만 함수형 프로그래밍으로 짜놓은 _map, _filter를 통해 그와 동일하게 사용 가능
console.log(
  _map(document.querySelectorAll("*"), (node) => node.nodeName)
);

// array 객체의 map,filter 매서드가 존재, 객체의 상태에 따라 결과가 달라짐
// 메서든 객체지향 프로그래밍
// 메서드는 해당클래스에 정의됨
// 해당 클래스에서만 사용가능함
// 객체지향 프로그래밍은 해당하는 클래스가 존재하지 않으면 사용할수 없음.
// 함수형 프로그래밍은 혼자 먼저 존재하기 때문에 평가시간이 좀 더 유연해지며, 다형성/실용성면에서 좋다.
// 3-3 내부다형성
// 3-3-1 predicate, iterates, mapper
_map([1, 2, 3, 4], (v) => v + 10);
// 내부다형성은 콜백함수가 보좌해준다.
