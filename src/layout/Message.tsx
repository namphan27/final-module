import { useEffect, useState } from "react";
import { Send, X, Edit3 } from "lucide-react";
import axiosInstance from "../utils/axios";
import socket from "../socket";

interface User {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string;
}

interface Conversation {
  _id: string;
  participants: User[];
  lastMessage: {
    content: string;
    createdAt: string;
  } | null;
  unreadCount: number;
}

interface MessageType {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
}

export default function Message() {
  const [open, setOpen] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");

  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (!open) return;

    const fetchConversations = async () => {
      try {
        const res = await axiosInstance.get("/messages/conversations");

        if (res.data.success) {
          setConversations(res.data.data.conversations);
        }
      } catch (err) {
        console.error("Fetch conversations failed", err);
      }
    };

    fetchConversations();
  }, [open]);

  const myUserId = JSON.parse(localStorage.getItem("user") || "{}")._id;
  useEffect(() => {
    if (!myUserId) return;

    socket.connect();
    socket.emit("join", myUserId);

    socket.on("receiveMessage", (msg) => {
      if (msg.conversationId !== conversationId) return;

      setMessages((prev) => [
        ...prev,
        {
          id: msg._id,
          text: msg.content,
          sender: msg.senderId._id === myUserId ? "me" : "other",
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [myUserId, conversationId]);

  useEffect(() => {
    if (!conversationId || !myUserId) return;

    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(
          `/messages/conversations/${conversationId}/messages`
        );

        if (res.data.success) {
          setMessages(
            res.data.data.messages.map((msg: any) => ({
              id: msg._id,
              text: msg.content,
              sender: msg.senderId._id === myUserId ? "me" : "other",
              time: new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }))
          );
        }
      } catch (err) {
        console.error("Fetch messages failed", err);
      }
    };

    fetchMessages();
  }, [conversationId, myUserId]);

  const searchUsers = async (keyword: string) => {
    setSearch(keyword);

    if (!keyword.trim()) {
      setUsers([]);
      return;
    }

    try {
      const res = await axiosInstance.get("/users/search", {
        params: { q: keyword },
      });

      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error("Search users failed", err);
    }
  };

  const startConversation = async (user: User) => {
    try {
      const res = await axiosInstance.post("/messages/conversations", {
        userId: user._id,
      });

      if (res.data.success) {
        setConversationId(res.data.data._id);
        setSelectedUser(user);
        setMessages([]);
        setShowNewChat(false);
      }
    } catch (err) {
      console.error("Create conversation failed", err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !conversationId || !selectedUser) return;

    try {
      const res = await axiosInstance.post("/messages/messages", {
        conversationId,
        recipientId: selectedUser._id,
        messageType: "text",
        content: input,
      });

      if (res.data.success) {
        const msg = res.data.data;

        setMessages((prev) => [
          ...prev,
          {
            id: msg._id,
            text: msg.content,
            sender: "me",
            time: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);

        setInput("");
      }
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full flex gap-2"
        >
          <Send size={18} />
          Tin nhắn
        </button>
      )}

      {open && (
        <div className="fixed bottom-4 right-4 w-96 h-150 bg-[#1f2226] rounded-xl flex flex-col text-white shadow-xl">
          <div className="h-14 px-4 flex items-center justify-between border-b border-gray-700">
            <span className="font-semibold">Tin nhắn</span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowNewChat(true)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <Edit3 size={18} />
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  setShowNewChat(false);
                  setSelectedUser(null);
                  setConversationId(null);
                  setMessages([]);
                }}
              >
                <X />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2">
            {showNewChat && !selectedUser && (
              <>
                <input
                  value={search}
                  onChange={(e) => searchUsers(e.target.value)}
                  placeholder="Tìm người dùng..."
                  className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-sm outline-none"
                />

                <div className="space-y-2">
                  {users.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer"
                      onClick={() => startConversation(user)}
                    >
                      <img
                        src={user.profilePicture}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold">{user.username}</div>
                        <div className="text-xs text-gray-400">
                          {user.fullName}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {!showNewChat && !selectedUser && (
              <div className="space-y-2">
                {conversations.map((conv) => {
                  const otherUser = conv.participants.find(
                    (u) => u._id !== myUserId
                  );

                  return (
                    <div
                      key={conv._id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer"
                      onClick={() => {
                        setConversationId(conv._id);
                        setSelectedUser(otherUser || null);
                      }}
                    >
                      <img
                        src={otherUser?.profilePicture}
                        className="w-10 h-10 rounded-full"
                      />

                      <div className="flex-1">
                        <div className="font-semibold">
                          {otherUser?.username}
                        </div>
                        <div className="text-xs text-gray-400 truncate">
                          {conv.lastMessage?.content || "Chưa có tin nhắn"}
                        </div>
                      </div>

                      {conv.unreadCount > 0 && (
                        <span className="text-xs bg-blue-500 px-2 rounded-full">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {selectedUser && (
              <div className="flex flex-col h-full">
                <div className="flex-1 space-y-2 overflow-y-auto mb-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`px-3 py-2 rounded-xl max-w-[70%] ${
                        msg.sender === "me"
                          ? "ml-auto bg-blue-500"
                          : "mr-auto bg-gray-700"
                      }`}
                    >
                      {msg.text}
                      <div className="text-xs text-gray-200 text-right">
                        {msg.time}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 bg-gray-800 rounded-full px-4 py-2"
                    placeholder={`Nhắn tin cho ${selectedUser.username}...`}
                  />
                  <button onClick={sendMessage}>
                    <Send />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
