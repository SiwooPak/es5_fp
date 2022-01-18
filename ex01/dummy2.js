const products = [
  {
    is_selected: true,
    name: "반팔티",
    price: 10000,
    sizes: [
      { name: "L", qty: 2, price: 0 },
      { name: "XL", qty: 3, price: 0 },
      { name: "XXL", qty: 2, price: 2000 },
    ],
  },
  {
    is_selected: true,
    name: "후드티",
    price: 21000,
    sizes: [
      { name: "L", qty: 3, price: -1000 },
      { name: "XXL", qty: 1, price: 2000 },
    ],
  },
  {
    is_selected: false,
    name: "맨투맨",
    price: 16000,
    sizes: [{ name: "L", qty: 4, price: 0 }],
  },
];

module.exports = { products };
