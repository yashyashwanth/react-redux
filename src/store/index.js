import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import burgerBuilderReducer from "./burgerBuilder";
import orderReducer from "./order";
import authReducer from "./auth";
import { watchAuth, watchIngredients, watchOrder } from "./sagas";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const sagaMiddlerware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddlerware))
);

// Saga Middleware Watcher
sagaMiddlerware.run(watchAuth);
sagaMiddlerware.run(watchIngredients);
sagaMiddlerware.run(watchOrder);

export default store;
