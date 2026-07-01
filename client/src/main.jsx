
import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import App from "./App";

import "./index.css";

import { store } from "./redux/store";

import { SocketProvider } from "./socket/SocketProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <BrowserRouter>
          <App />
          <ToastContainer position="top-right" autoClose={2000} />
        </BrowserRouter>
      </SocketProvider>
    </Provider>
  </React.StrictMode>,
);