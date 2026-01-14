import { createSlice } from "@reduxjs/toolkit";
interface UserState {
  items: string[];
  isSearchOpen: boolean;
  isMessageOpen: boolean;
  name?: string;
}

export const initialState: UserState = {
  items: [],
  isSearchOpen: false,
  isMessageOpen: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    update: (state, action) => {
      state.name = action.payload;
    },
    openSearch: (state) => {
      state.isSearchOpen = true;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
    openMessage: (state) => {
      state.isMessageOpen = true;
    },
    closeMessage: (state) => {
      state.isMessageOpen = false;
    },
  },
});
export const { update, openSearch, closeSearch, openMessage, closeMessage } =
  userSlice.actions;
export default userSlice.reducer;
