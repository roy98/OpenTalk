/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike {
    onCreateLike {
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
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike {
    onUpdateLike {
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
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike {
    onDeleteLike {
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
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
      id
      name
      image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
      id
      name
      image
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
      id
      name
      image
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFriend = /* GraphQL */ `
  subscription OnCreateFriend {
    onCreateFriend {
      id
      userID
      friendID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFriend = /* GraphQL */ `
  subscription OnUpdateFriend {
    onUpdateFriend {
      id
      userID
      friendID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFriend = /* GraphQL */ `
  subscription OnDeleteFriend {
    onDeleteFriend {
      id
      userID
      friendID
      createdAt
      updatedAt
    }
  }
`;
