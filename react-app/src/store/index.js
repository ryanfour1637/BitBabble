import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import bytespaceReducer from "./bytespace";
import bytespaceMembersReducer from "./bytespace_members";
import bytestreamsReducer from "./bytestream";

const rootReducer = combineReducers({
   session,
   bytespace: bytespaceReducer,
   bytespaceMembers: bytespaceMembersReducer,
   bytestreams: bytestreamsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
   enhancer = applyMiddleware(thunk);
} else {
   const logger = require("redux-logger").default;
   const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
   enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
   return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
