import axiosMiddleware from "redux-axios-middleware";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./reducers/RootReducer";
import HttpService from "app/services/HttpService";

import createMiddlewareSaga from "redux-saga";
const middlewareSaga = createMiddlewareSaga();
const initialState = {};

//const middlewares = [thunk];
const middlewares = [
  thunk,
  //routerMiddleware(browserHistory),
  axiosMiddleware(HttpService.getAxiosClient()),
  middlewareSaga,
  
];
export const Store = createStore(
  RootReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares)
    // applyMiddleware(...middlewares),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

