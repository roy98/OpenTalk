import { wait } from "../../Utils/core";
import allPosts from "./../../API/FakePosts";
import * as Alert from "./alert_action";

export const getAllPosts = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    wait(4000).then(() => {
      dispatch({ type: "LOADING", payload: false });
      dispatch({
        type: "LOAD_ALL_POSTS",
        payload: allPosts,
      });
    });
  };
};

export const toggleLikedPost = (post, userid) => {
  return (dispatch) => {
    dispatch({
      type: "TOGGLE_USER_LIKED_POST",
      payload: { id: post.id, userid: userid },
    });
  };
};
