import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddle from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import App from "./App";
import "./index.css";

console.log(Layout);
const store = createStore(
  combineReducers({ count: () => null }),
  applyMiddleware(thunkMiddle)
);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout routes={[{ path: "home", PageComponent: App }]} />
    </BrowserRouter>
  </Provider>
);
