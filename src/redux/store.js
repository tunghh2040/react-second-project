import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/loginSlice";

export default configureStore({
  reducer: {
    userManage: userReducer,
    login: authReducer,
  },
});
