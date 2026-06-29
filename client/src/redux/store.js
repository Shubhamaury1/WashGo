// import { configureStore } from "@reduxjs/toolkit";

// import authReducer from "./authSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";

// import chatReducer from "./chatSlice";
// import notificationReducer from "./notificationSlice";
// import socketReducer from "./socketSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,

//     chat: chatReducer,
//     notification: notificationReducer,
//     socket: socketReducer,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import chatReducer from "./chatSlice";
import notificationReducer from "./notificationSlice";
import socketReducer from "./socketSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    notification: notificationReducer,
    socket: socketReducer,
  },
});