import { wait } from "../../Utils/core";
import allCategories from "./../../API/FakeCategories";

export const getAllCategories = (categories) => {
  return (dispatch) => {
    dispatch({
      type: "LOAD_ALL_CATEGORIES",
      payload: categories,
    });
  };
};

export const toggleCategory = (category) => {
  return (dispatch) => {
    dispatch({
      type: "TOGGLE_USER_CATEGORIE",
      payload: category,
    });
  };
};
