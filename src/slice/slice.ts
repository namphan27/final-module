import { createSlice } from "@reduxjs/toolkit";
interface UserState {
  items: string[];
  isSearchOpen?: boolean;
  name?: string;
}
export const initialState: UserState = {
  items: [],
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
  },
});
export const { update, openSearch, closeSearch } = userSlice.actions;
export default userSlice.reducer;
