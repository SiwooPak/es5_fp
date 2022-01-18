const { go, map } = require("../partial");
const square = (a) =>
  new Promise(function (resolve) {
    setTimeout(() => resolve(a * a), 500);
  });
// console.log(square(5));

// square(10).then((res) => console.log(res));
/*
console.log("first");
square(10).then((res) => {
  console.log("second");
  console.log(res);
});
console.log("third");

console.log("순서대로 출력");

console.log("first");
square(10)
  .then((res) => {
    console.log("second");
    console.log(res);
  })
  .then(() => console.log("third"));

square(10).then(square).then(square).then(console.log);
*/
// go()로 비동기 만들어보기
// go(square(10), square, square, console.log);

const list = [2, 3, 4];

new Promise(function (resolve) {
  (function recur(res) {
    if (list.length === res.length) return resolve(res);
    square(list[res.length]).then(function (val) {
      res.push(val);
      recur(res);
    });
  })([]);
}).then(console.log);

// 고차함수로 간결하게
go(list, map(square), console.log);
