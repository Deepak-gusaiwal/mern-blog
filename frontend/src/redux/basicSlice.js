import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNavOpen: false,
  isLoading: true,
};

export const basicSlice = createSlice({
  name: "basicSlice",
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.isNavOpen = !state.isNavOpen;
    },
    toggleIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleNav,toggleIsLoading } = basicSlice.actions;

export default basicSlice.reducer;
