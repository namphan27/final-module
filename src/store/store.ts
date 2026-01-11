import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/slice";
import notificationReducer from "../slice/notificationSlice";
export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
