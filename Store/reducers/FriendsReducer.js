const initialState = {
  friends: [],
  userFriends: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_ALL_USERS":
      return {
        ...state,
        friends: action.payload,
      };
    case "LOAD_ALL_FOLLOWERS":
      return {
        ...state,
        userFriends: action.payload,
      };
    case "TOGGLE_USER_FRIEND":
      const index = state.userFriends.findIndex(
        (f) => f.id === action.payload.id
      );
      if (index !== -1) {
        return {
          ...state,
          userFriends: state.userFriends.filter(
            (f, fIndex) => fIndex !== index
          ),
        };
      } else {
        return {
          ...state,
          userFriends: [...state.userFriends, action.payload],
        };
      }
    default:
      return state;
  }
};

export default reducer;
