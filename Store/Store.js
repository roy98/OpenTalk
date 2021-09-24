import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(Thunk));

export default store;
