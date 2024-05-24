import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
