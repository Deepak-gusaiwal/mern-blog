import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: { isLogin: false },
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    storeLogin: (state, action) => {
      state.userData = { ...action.payload, isLogin: true };
    },
    storeLogout: (state) => {
      state.userData = { isLogin: false };
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeLogin, storeLogout } = userSlice.actions;

export default userSlice.reducer;
