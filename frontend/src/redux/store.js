import { configureStore } from "@reduxjs/toolkit";
import basicSlice from "./basicSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: { basicSlice, userSlice },
});
