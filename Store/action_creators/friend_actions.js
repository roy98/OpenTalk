import { wait } from "../../Utils/core";
import allFriends from "./../../API/FakeFriends";

export const getAllUsers = (allUsers) => {
  return (dispatch) => {
    wait(2000).then(() => {
      dispatch({
        type: "LOAD_ALL_USERS",
        payload: allUsers,
      });
    });
  };
};

export const getAllFollowers = (followers) => {
  return (dispatch) => {
    wait(2000).then(() => {
      dispatch({
        type: "LOAD_ALL_FOLLOWERS",
        payload: followers,
      });
    });
  };
};

export const toggleFriend = (friend) => {
  return (dispatch) => {
    dispatch({
      type: "TOGGLE_USER_FRIEND",
      payload: friend,
    });
  };
};
