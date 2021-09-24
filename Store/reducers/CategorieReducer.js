const initialState = {
  categories: [],
  userCategories: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_ALL_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "TOGGLE_USER_CATEGORIE":
      const index = state.userCategories.findIndex(
        (cat) => cat.id === action.payload.id
      );
      if (index !== -1) {
        return {
          ...state,
          userCategories: state.userCategories.filter(
            (cat, catIndex) => catIndex !== index
          ),
        };
      } else {
        return {
          ...state,
          userCategories: [...state.userCategories, action.payload],
        };
      }
    default:
      return state;
  }
};

export default reducer;
