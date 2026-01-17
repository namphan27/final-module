import { Bell } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { clearNotification, newMessage } from "../slice/notificationSlice";
import socket from "../socket";

// types/message.ts
export interface ChatMessage {
  senderId: string;
  recipientId: string;
  content: string;
  createdAt?: string;
}

export default function Notifications() {
  const dispatch = useDispatch();
  const { unreadCount, lastMessage } = useSelector(
    (state: RootState) => state.notification
  );

  useEffect(() => {
    socket.on("receiveMessage", (message: ChatMessage) => {
      dispatch(newMessage(message.content));
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [dispatch]);

  if (unreadCount === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg cursor-pointer w-72 z-50"
      onClick={() => dispatch(clearNotification())}
    >
      <div className="flex items-center gap-2 mb-1">
        <Bell size={18} className="text-blue-400" />
        <span className="font-semibold">{unreadCount} tin nhắn mới</span>
      </div>

      {lastMessage && (
        <div className="text-sm text-gray-300 truncate">{lastMessage}</div>
      )}
    </div>
  );
}
