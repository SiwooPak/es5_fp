const { _pipe } = require("../underscore");
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
} = require("../partial");
const { users, posts, comments } = require("./dummy");

// 1. 특정인의 posts의 모든 comments 거르기
go(
  // filter(posts, (post) => post.user_id === 101),
  where(posts, { user_id: 101 }),
  // map((post) => post.id),
  pluck("id"),
  (post_ids) =>
    filter(comments, (comment) =>
      contains(post_ids, comment.post_id)
    ),
  console.log
);

// 2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기
go(
  where(posts, { user_id: 101 }),
  pluck("id"),
  (post_ids) =>
    filter(comments, (comment) =>
      contains(post_ids, comment.post_id)
    ),
  map(
    (comment) =>
      find(users, (user) => user.id === comment.user_id).name
  ),
  uniq,
  console.log
);

const postsBy = function (attr) {
  return where(posts, attr);
};
const commentsByPosts = pipe(function (post_ids) {
  return filter(comments, function (comment) {
    return contains(post_ids, comment.post_id);
  });
});
go(
  // postsBy({ user_id: 101 }),
  { user_id: 101 },
  postsBy,
  pluck("id"),
  commentsByPosts,
  map(
    (comment) =>
      find(users, (user) => user.id === comment.user_id).name
  ),
  uniq,
  console.log
);
// 3. 특정인의 posts에 comments를 단 친구들 카운트정보
go(
  { user_id: 101 },
  postsBy,
  pluck("id"),
  commentsByPosts,
  map(
    (comment) =>
      find(users, (user) => user.id === comment.user_id).name
  ),
  count_by,
  console.log
);

const f1 = pipe(postsBy, commentsByPosts);
console.log(f1({ user_id: 101 }));

const user_names_by_comments = map(function (comment) {
  return find(users, function (user) {
    return user.id === comment.user_id;
  }).name;
});

const f2 = pipe(f1, user_names_by_comments, uniq);
console.log(f2({ user_id: 101 }));

const f3 = pipe(f1, user_names_by_comments, count_by);
console.log(f3({ user_id: 101 }));
// 4. 특정인의 comments를 단 posts를 거르기
go(
  where(comments, { user_id: 105 }),
  pluck("post_id"),
  uniq, // 같은 posts에 댓글을 단 것 중복제거
  (post_ids) => filter(posts, (post) => contains(post_ids, post.id)),
  console.log
);
