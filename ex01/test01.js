const users = [
  { id: 101, name: "ID" },
  { id: 102, name: "BJ" },
  { id: 103, name: "PJ" },
  { id: 104, name: "HA" },
  { id: 105, name: "JE" },
  { id: 106, name: "JI" },
];

const posts = [
  { id: 201, body: "내용1", user_id: 101 },
  { id: 202, body: "내용2", user_id: 102 },
  { id: 203, body: "내용3", user_id: 103 },
  { id: 204, body: "내용4", user_id: 102 },
  { id: 205, body: "내용5", user_id: 101 },
];

const comments = [
  { id: 301, body: "댓글1", user_id: 105, post_id: 201 },
  { id: 302, body: "댓글2", user_id: 104, post_id: 201 },
  { id: 303, body: "댓글3", user_id: 104, post_id: 202 },
  { id: 304, body: "댓글4", user_id: 105, post_id: 203 },
  { id: 305, body: "댓글5", user_id: 106, post_id: 203 },
  { id: 306, body: "댓글6", user_id: 106, post_id: 204 },
  { id: 307, body: "댓글7", user_id: 102, post_id: 205 },
  { id: 308, body: "댓글8", user_id: 103, post_id: 204 },
  { id: 309, body: "댓글9", user_id: 103, post_id: 202 },
  { id: 310, body: "댓글10", user_id: 105, post_id: 201 },
];

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
