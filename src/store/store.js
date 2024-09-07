import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postsSlice from "./postsSlice";

export default configureStore({
  reducer: { auth: authSlice, allposts: postsSlice },
});
// todo: add post reducer
