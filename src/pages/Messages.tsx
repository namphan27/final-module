import { useState } from "react";

type Message = {
  id: number;
  text: string;
  sender: "me" | "other";
};

type Conversation = {
  id: number;
  name: string;
  lastMessage: string;
  messages: Message[];
};

const initialConversations: Conversation[] = [
  {
    id: 1,
    name: "Phan Hải Nam",
    lastMessage: "Bạn · 1 phút",
    messages: [],
  },
];

export default function Messages() {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);

  const [activeId, setActiveId] = useState<number>(1);
  const [input, setInput] = useState("");

  const activeConversation = conversations.find((c) => c.id === activeId);

  const handleSendMessage = () => {
    if (!input.trim() || !activeConversation) return;

    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "me",
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [...c.messages, newMessage],
              lastMessage: input,
            }
          : c
      )
    );

    setInput("");
  };

  return (
    <div className="h-screen flex bg-[#0e0f12] text-white">
      <div className="w-88 border-r border-gray-800">
        <div className="p-4 font-semibold border-b border-gray-800">
          Tin nhắn
        </div>

        {conversations.map((c) => (
          <div
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`flex gap-3 px-4 py-3 cursor-pointer
              ${activeId === c.id ? "bg-[#1a1a1a]" : "hover:bg-[#1a1a1a]"}
            `}
          >
            <div className="w-12 h-12 rounded-full bg-gray-600" />
            <div>
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-gray-400 truncate max-w-50">
                {c.lastMessage || "Chưa có tin nhắn"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            <div className="h-16 border-b border-gray-800 flex items-center px-6">
              <div className="w-9 h-9 rounded-full bg-gray-600 mr-3" />
              <span className="font-semibold">{activeConversation.name}</span>
            </div>

            <div className="flex-1 px-6 py-4 space-y-2 overflow-y-auto">
              {activeConversation.messages.length === 0 && (
                <div className="text-gray-500 text-center">
                  Chưa có tin nhắn
                </div>
              )}

              {activeConversation.messages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm
                    ${
                      m.sender === "me" ? "ml-auto bg-blue-500" : "bg-[#262626]"
                    }
                  `}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-4 border-t border-gray-800"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhắn tin..."
                className="w-full bg-[#1a1a1a] rounded-full px-4 py-2 outline-none"
              />
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Chọn một cuộc trò chuyện
          </div>
        )}
      </div>
    </div>
  );
}
