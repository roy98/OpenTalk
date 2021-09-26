/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
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
        post {
          id
          content
          status
          date
          userID
          image_url
          createdAt
          updatedAt
        }
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLike = /* GraphQL */ `
  query GetLike($id: ID!) {
    getLike(id: $id) {
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
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
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
        post {
          id
          content
          status
          date
          userID
          image_url
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      image
      createdAt
      updatedAt
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFriend = /* GraphQL */ `
  query GetFriend($id: ID!) {
    getFriend(id: $id) {
      id
      userID
      friendID
      createdAt
      updatedAt
    }
  }
`;
export const listFriends = /* GraphQL */ `
  query ListFriends(
    $filter: ModelFriendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriends(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        friendID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const postByDate = /* GraphQL */ `
  query PostByDate(
    $createdAt: String
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postByDate(
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
