import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import authSlice from "./authSlice";

export default configureStore({ reducer: { auth: authSlice } });
