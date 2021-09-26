const initialState = {
  posts: [],
  userLikedPosts: [],
};

function recentPostFirst(a, b) {
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  if (a.createdAt > b.createdAt) {
    return -1;
  }
  return 0;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_ALL_POSTS":
      const sortedPosts = action.payload.sort(recentPostFirst);
      return {
        ...state,
        posts: sortedPosts,
      };
    case "LOAD_ALL_LIKES":
      return {
        ...state,
        userLikedPosts: action.payload,
      };
    case "ON_POST_CREATED":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case "TOGGLE_USER_LIKED_POST":
      const index = state.userLikedPosts.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        return {
          ...state,
          userLikedPosts: state.userLikedPosts.filter(
            (p, pIndex) => pIndex !== index
          ),
        };
      } else {
        return {
          ...state,
          userLikedPosts: [...state.userLikedPosts, action.payload],
        };
      }
    default:
      return state;
  }
};

export default reducer;
