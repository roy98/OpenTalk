/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      alias
      email
      avatar
      categories {
        items {
          id
          name
          image
          createdAt
          updatedAt
        }
        nextToken
      }
      posts {
        items {
          id
          content
          status
          date
          userID
          image_url
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          postID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      friends {
        items {
          id
          userID
          friendID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      alias
      email
      avatar
      categories {
        items {
          id
          name
          image
          createdAt
          updatedAt
        }
        nextToken
      }
      posts {
        items {
          id
          content
          status
          date
          userID
          image_url
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          postID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      friends {
        items {
          id
          userID
          friendID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      alias
      email
      avatar
      categories {
        items {
          id
          name
          image
          createdAt
          updatedAt
        }
        nextToken
      }
      posts {
        items {
          id
          content
          status
          date
          userID
          image_url
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          postID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      friends {
        items {
          id
          userID
          friendID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      content
      status
      date
      userID
      user {
        id
        name
        alias
        email
        avatar
        categories {
          nextToken
        }
        posts {
          nextToken
        }
        likes {
          nextToken
        }
        friends {
          nextToken
        }
        createdAt
        updatedAt
      }
      image_url
      createdAt
      comments {
        items {
          id
          postID
          userID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          postID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      content
      status
      date
      userID
      user {
        id
        name
        alias
        email
        avatar
        categories {
          nextToken
        }
        posts {
          nextToken
        }
        likes {
          nextToken
        }
        friends {
          nextToken
        }
        createdAt
        updatedAt
      }
      image_url
      createdAt
      comments {
        items {
          id
          postID
          userID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          postID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      content
      status
      date
      userID
      user {
        id
        name
        alias
        email
        avatar
        categories {
          nextToken
        }
        posts {
          nextToken
        }
        likes {
          nextToken
        }
        friends {
          nextToken
        }
        createdAt
        updatedAt
      }
      image_url
      createdAt
      comments {
        items {
          id
          postID
          userID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          postID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      postID
      userID
      user {
        id
        name
        alias
        email
        avatar
        categories {
          nextToken
        }
        posts {
          nextToken
        }
        likes {
          nextToken
        }
        friends {
          nextToken
        }
        createdAt
        updatedAt
      }
      post {
        id
        content
        status
        date
        userID
        user {
          id
          name
          alias
          email
          avatar
          createdAt
          updatedAt
        }
        image_url
        createdAt
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      postID
      userID
      user {
        id
        name
        alias
        email
        avatar
        categories {
          nextToken
        }
        posts {
          nextToken
        }
        likes {
          nextToken
        }
        friends {
          nextToken
        }
        createdAt
        updatedAt
      }
      post {
        id
        content
        status
        date
        userID
        user {
          id
          name
          alias
          email
          avatar
          createdAt
          updatedAt
        }
        image_url
        createdAt
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      postID
      userID
      user {
        id
        name
        alias
        email
        avatar
        categories {
          nextToken
        }
        posts {
          nextToken
        }
        likes {
          nextToken
        }
        friends {
          nextToken
        }
        createdAt
        updatedAt
      }
      post {
        id
        content
        status
        date
        userID
        user {
          id
          name
          alias
          email
          avatar
          createdAt
          updatedAt
        }
        image_url
        createdAt
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
      id
      postID
      userID
      user {
        id
        name
        alias
        email
        avatar
        categories {
          nextToken
        }
        posts {
          nextToken
        }
        likes {
          nextToken
        }
        friends {
          nextToken
        }
        createdAt
        updatedAt
      }
      post {
        id
        content
        status
        date
        userID
        user {
          id
          name
          alias
          email
          avatar
          createdAt
          updatedAt
        }
        image_url
        createdAt
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
      id
      postID
      userID
      user {
        id
        name
        alias
        email
        avatar
        categories {
          nextToken
        }
        posts {
          nextToken
        }
        likes {
          nextToken
        }
        friends {
          nextToken
        }
        createdAt
        updatedAt
      }
      post {
        id
        content
        status
        date
        userID
        user {
          id
          name
          alias
          email
          avatar
          createdAt
          updatedAt
        }
        image_url
        createdAt
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
      id
      postID
      userID
      user {
        id
        name
        alias
        email
        avatar
        categories {
          nextToken
        }
        posts {
          nextToken
        }
        likes {
          nextToken
        }
        friends {
          nextToken
        }
        createdAt
        updatedAt
      }
      post {
        id
        content
        status
        date
        userID
        user {
          id
          name
          alias
          email
          avatar
          createdAt
          updatedAt
        }
        image_url
        createdAt
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      name
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      name
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      name
      image
      createdAt
      updatedAt
    }
  }
`;
export const createFriend = /* GraphQL */ `
  mutation CreateFriend(
    $input: CreateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    createFriend(input: $input, condition: $condition) {
      id
      userID
      friendID
      createdAt
      updatedAt
    }
  }
`;
export const updateFriend = /* GraphQL */ `
  mutation UpdateFriend(
    $input: UpdateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    updateFriend(input: $input, condition: $condition) {
      id
      userID
      friendID
      createdAt
      updatedAt
    }
  }
`;
export const deleteFriend = /* GraphQL */ `
  mutation DeleteFriend(
    $input: DeleteFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    deleteFriend(input: $input, condition: $condition) {
      id
      userID
      friendID
      createdAt
      updatedAt
    }
  }
`;
