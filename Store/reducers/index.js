import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import CategorieReducer from "./CategorieReducer";
import FriendsReducer from "./FriendsReducer";
import PostReducer from "./PostReducer";
import AlertReducer from "./AlertReducer";

const reducers = combineReducers({
  authentication: AuthReducer,
  category: CategorieReducer,
  friend: FriendsReducer,
  post: PostReducer,
  alert: AlertReducer,
});

export default reducers;
