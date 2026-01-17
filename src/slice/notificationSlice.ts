import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  unreadCount: number;
  lastMessage: string | null;
}

const initialState: NotificationState = {
  unreadCount: 0,
  lastMessage: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    newMessage(state, action: PayloadAction<string>) {
      state.unreadCount += 1;
      state.lastMessage = action.payload;
    },
    clearNotification(state) {
      state.unreadCount = 0;
      state.lastMessage = null;
    },
  },
});

export const { newMessage, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
