const initialState = {
  isLoading: true,
  isSignedOut: false,
  userToken: null,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...state,
        userToken: action.payload.token,
        user: action.payload.user,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...state,
        isSignedOut: false,
        userToken: action.payload,
        user: action.payload.user,
      };
    case "SIGN_UP":
      return {
        ...state,
        isSignedOut: false,
        user: action.payload.user,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignedOut: true,
        userToken: null,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
