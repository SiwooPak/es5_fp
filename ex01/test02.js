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
  flatten,
  deep_pluck,
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

const posts2 = go(
  posts,
  map((post) => {
    return extend(
      {
        comments: comments2[post.id] || [],
        user: users2[post.user_id],
      },
      post
    );
  })
);
// console.log(posts2);
const commentsByGroup = go(
  comments,
  map((comment) =>
    extend({ user: findUserById(comment.user_id) }, comment)
  ),
  group_by("post_id")
);

const posts3 = go(
  posts,
  map((post) => {
    return extend(
      {
        comments: commentsByGroup[post.id] || [],
        user: findUserById(post.user_id),
      },
      post
    );
  }),
  group_by("user_id")
);
// console.log(posts3);

const users3 = map(users2, (user) =>
  extend({ posts: posts3[user.id] || [] }, user)
);

// console.log(users3);

// 5-1. 특정인의 posts의 모든 comments 거르기
const selected_user = users3[0];
// go(selected_user.posts, pluck("comments"), flatten, console.log);

// pluck+flatten
// go(selected_user, deep_pluck("post.comments"), console.log);
// 좀더 축약
// console.log(deep_pluck(selected_user, "posts.comments"));
// 5-2. 특정인의 post에 comments를 단 친구의 이름들 뽑기
go(
  selected_user.posts,
  pluck("comments"),
  flatten,
  pluck("user"),
  pluck("name"),
  uniq,
  console.log
);

// 축약
go(
  selected_user,
  deep_pluck("posts.comments.user.name"),
  uniq,
  console.log
);
// 5-3. 특정인의 posts에 comments를 단 친구들 카운터 정보
go(
  selected_user.posts,
  pluck("comments"),
  flatten,
  pluck("user"),
  pluck("name"),
  count_by,
  console.log
);

// 축약
go(
  selected_user,
  deep_pluck("posts.comments.user.name"),
  count_by,
  console.log
);
// 5-4. 특정인이 comment를 단 posts 거르기
const result = filter(posts2, (post) =>
  find(post.comments, (comment) => comment.user_id === 105)
);
console.log(posts2)
console.log(result);
