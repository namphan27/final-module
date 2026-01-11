import { Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { clearNotification } from "../slice/notificationSlice";

export default function Notifications() {
  const dispatch = useDispatch();
  const { unreadCount, lastMessage } = useSelector((state: RootState) => state.notification);

  if (unreadCount === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg cursor-pointer w-72"
      onClick={() => dispatch(clearNotification())}
    >
      <div className="flex items-center gap-2 mb-1">
        <Bell size={18} className="text-blue-400" />
        <span className="font-semibold">{unreadCount} tin nhắn mới</span>
      </div>
      {lastMessage && <div className="text-sm text-gray-300 truncate">{lastMessage}</div>}
    </div>
  );
}
