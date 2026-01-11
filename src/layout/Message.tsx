import { useState, useEffect } from "react";
import { Send, X } from "lucide-react";
import socket from "../socket";
import { useDispatch } from "react-redux";
import { newMessage } from "../slice/notificationSlice";

interface User {
  id: number;
  name: string;
  avatar: string;
  lastSeen: string;
}

interface MessageType {
  id: number;
  text: string;
  sender: "me" | "other";
  time: string;
}

export default function Message() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");

  const users: User[] = [
    { id: 1, name: "Phan Hải Nam", avatar: "https://picsum.photos/100/100", lastSeen: "4 phút" },
    { id: 2, name: "Nguyễn Văn A", avatar: "https://picsum.photos/101/101", lastSeen: "10 phút" },
  ];

  useEffect(() => {
    socket.on("new_message", (msg: MessageType) => {
      setMessages((prev) => [...prev, msg]);
      if (msg.sender === "other") {
        dispatch(newMessage(msg.text));
      }
    });
    return () => {
      socket.off("new_message");
    };
  }, [dispatch]);

  const sendMessage = () => {
    if (!input.trim() || !selectedUser) return;
    const roomId = `room_${selectedUser.id}`;
    const msg: MessageType = {
      id: Date.now(),
      text: input,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, msg]);
    socket.emit("send_message", { roomId, message: msg });
    setInput("");
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg"
        >
          <Send size={18} />
          <span>Tin nhắn</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-[#1f2226] rounded-xl shadow-lg flex flex-col text-white">
          <div className="h-14 px-4 flex items-center justify-between border-b border-gray-700">
            <span className="font-semibold text-lg">Tin nhắn</span>
            <button
              onClick={() => { setOpen(false); setSelectedUser(null); setMessages([]); }}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2">
            {!selectedUser ? (
              <div className="flex flex-col gap-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer"
                    onClick={() => setSelectedUser(user)}
                  >
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-gray-400">Bạn · {user.lastSeen}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-2 mb-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${
                        msg.sender === "me" ? "ml-auto bg-blue-500" : "mr-auto bg-gray-700"
                      }`}
                    >
                      {msg.text}
                      <div className="text-xs text-gray-300 mt-1 text-right">{msg.time}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Nhắn tin..."
                    className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-sm outline-none"
                  />
                  <button onClick={sendMessage} className="text-blue-400 font-medium"><Send /></button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
