const { go, filter, reduce } = require("../partial");
const { _get } = require("../underscore");
const { products } = require("./dummy2");
// 장바구니
// 1. 모든 수량
const total_qty = reduce(
  (tq, product) =>
    reduce(product.sizes, (tq, size) => tq + size.qty, tq),
  0
);
go(products, total_qty, console.log);

// 2. 선택된 총수량
go(
  products,
  filter((product) => product.is_selected),
  total_qty,
  console.log
);
// 커스텀 함수사용해서 축약
// go(products, filter(_get("is_selected")), total_qty, console.log);
console.log(total_qty(filter(products, _get("is_selected"))));
// 3. 모든 가격
const total_price = reduce(
  (tp, product) =>
    reduce(
      product.sizes,
      (tp, size) => tp + (product.price + size.price) * size.qty,
      tp
    ),
  0
);
go(products, total_price, console.log);

// 4. 선택된 상품의 총 가격
go(products, filter(_get("is_selected")), total_price, console.log);
