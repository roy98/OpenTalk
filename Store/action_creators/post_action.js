import { wait } from "../../Utils/core";
import allPosts from "./../../API/FakePosts";
import * as Alert from "./alert_action";

export const getAllPosts = (posts) => {
  return (dispatch) => {
    dispatch({
      type: "LOAD_ALL_POSTS",
      payload: posts,
    });
  };
};

export const getAllLikes = (likes) => {
  return (dispatch) => {
    dispatch({
      type: "LOAD_ALL_LIKES",
      payload: likes,
    });
  };
};

export const newPostAdded = (post) => {
  return (dispatch) => {
    dispatch({
      type: "ON_POST_CREATED",
      payload: post,
    });
  };
};

export const toggleLikedPost = (like) => {
  return (dispatch) => {
    dispatch({
      type: "TOGGLE_USER_LIKED_POST",
      payload: like,
    });
  };
};
