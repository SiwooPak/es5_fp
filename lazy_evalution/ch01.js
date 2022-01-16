const {
  L,
  go,
  range,
  map,
  filter,
  take,
  some,
} = require("../partial");

// 지연평가: 계산의 결과값이 필요할때까지 계산을 늦추는 기법
// 이점:
// 1> 불필요한 계산을 하지 않으므로 빠른 계산 가능
// 2> 무한 자료 구조를 사용할 수 있음
// 3> 복잡한 수식에서 오류 상태를 피할 수 있음

// 1. 지연 평가를 시작시키고 유지시키는 함수
// 1-1. map
let mi = 0,
  fi = 0;

go(
  range(100),
  map((val) => {
    ++mi;
    return val * val;
  }),
  filter((val) => {
    ++fi;
    return val % 2;
  }),
  take(5),
  console.log
);
console.log(mi, fi);

(mi = 0), (fi = 0);
go(
  range(100),
  L.map((val) => {
    ++mi;
    return val * val;
  }),
  L.filter((val) => {
    ++fi;
    return val % 2;
  }),
  L.take(5),
  console.log
);

console.log(mi, fi);

(mi = 0), (fi = 0);
go(
  range(100),
  L.map((val) => {
    ++mi;
    return val * val;
  }),
  L.filter((val) => {
    ++fi;
    return val % 2;
  }),
  L.some((val) => val > 100),
  console.log
);

console.log(mi, fi);

// 엄격한 평가는 함수를 하나를 다 실행하고 다음 함수를 넘어가는 수평적인 방식이라면
// 지연 평가는 수직적인 방식
// 첫번째 _go()는 엄격한 평가로 100,100,5
// 두번째 _go()는 지연평가로 10,10
// 세번째 _go()는 지연평가로 12,12
