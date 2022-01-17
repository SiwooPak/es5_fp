const {
  _,
  go,
  filter,
  find,
  contains,
  map,
  pluck,
  where,
  uniq,
  pipe,
  count_by,
  extend,
  index_by,
  group_by,
} = require("../partial");
const { _filter } = require("../underscore");
const { users, posts, comments } = require("./dummy");

// 5. users+posts+comments (indexBy와 groupBy로 효율 높이기)
const comments2 = map(comments, (comment) => {
  return extend(
    { user: find(users, (user) => user.id === comment.user_id) },
    comment
  );
});

// console.log(comments2);

// id를 키값을 갖는 오브젝트 생성하는 함수
/*
const findUserById = (user_id) => {
  return find(users, (user) => user.id === user_id);
};
*/
const users2 = index_by(users, "id");
const findUserById = (user_id) => users2[user_id];

const comments3 = map(comments, (comment) => {
  return extend({ user: findUserById(comment.user_id) }, comment);
});

//console.log(comments3);

const posts2 = map(posts, (post) => {
  return extend({ user: findUserById(post.user_id) }, post);
});
// console.log(posts2);
const commentsByGroup = go(
  comments,
  map((comment) =>
    extend({ user: findUserById(comment.user_id) }, comment)
  ),
  group_by("post_id")
);

const posts3 = map(posts, (post) => {
  return extend(
    {
      comments: commentsByGroup[post.id],
    },
    { user: findUserById(post.user_id) },
    post
  );
});
// console.log(posts3);

const users3 = map(users2, (user) =>
  extend(
    {
      posts: filter(posts2, (post) => post.user_id === user.id),
    },
    user
  )
);

console.log(users3);
JSON.stringify(users3);
// 5-1. 특정인의 posts의 모든 comments 거르기

// 5-2. 특정인의 post에 comments를 단 친구의 이름들 뽑기
