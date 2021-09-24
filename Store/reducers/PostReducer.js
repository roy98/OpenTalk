const initialState = {
  posts: [],
  userLikedPosts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_ALL_POSTS":
      return {
        ...state,
        posts: action.payload,
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
