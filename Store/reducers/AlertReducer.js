const initialState = {
  isLoading: false,
  success: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SUCCESS":
      return {
        ...state,
        success: action.payload,
        error: null,
        clear: false,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        success: null,
        clear: false,
      };
    case "CLEAR":
      return {
        ...state,
        error: null,
        success: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
