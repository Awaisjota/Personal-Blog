import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice";
import authReducer from "../features/authSlice";
import contactReducer from "../features/contactSlice";
const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    contact: contactReducer,
  },
});

export default store;
