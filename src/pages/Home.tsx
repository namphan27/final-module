import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserProfile } from "./Profile";

interface Post {
  id: number;
  username: string;
  avatar: string;
  image: string;
  likes: string;
  comments: string;
  caption: string;
}

const suggestions = [
  { name: "Phan Hải Nam", avatar: "/avatar2.jpg" },
  { name: "Phan Hải Nam", avatar: "/avatar3.jpg" },
  { name: "Phan Hải Nam", avatar: "/avatar4.jpg" },
  { name: "Phan Hải Nam", avatar: "/avatar5.jpg" },
];

const posts: Post[] = [
  {
    id: 1,
    username: "nomoney._.nohappy",
    avatar: "https://picsum.photos/100/100?random=1",
    image: "https://picsum.photos/500/900?random=1",
    likes: "3.7K",
    comments: "1K",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    username: "coding.daily",
    avatar: "https://picsum.photos/100/100?random=2",
    image: "https://picsum.photos/500/900?random=2",
    likes: "1.2K",
    comments: "2K",
    caption: "Learning React every day 🚀",
  },
  {
    id: 3,
    username: "tailwind.ui",
    avatar: "https://picsum.photos/100/100?random=3",
    image: "https://picsum.photos/500/900?random=3",
    likes: "9.4K",
    comments: "3K",
    caption: "Clean UI, clean code ✨",
  },
];

export default function Home() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    navigate("/login");
  };
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  return (
    <div className="relative w-full flex justify-center">
      <div className="w-full max-w-[500px] space-y-6">
        <div className="flex flex-col items-center w-full max-w-[470px]">
          {posts.map((post) => (
            <div
              key={post.id}
              className="w-full rounded-lg mb-6 border border-gray-700 bg-[#1e1e1e] overflow-hidden"
            >
              <div className="flex items-center p-3 gap-3 border-b border-gray-700">
                <img
                  src={post.avatar}
                  alt={post.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-semibold text-sm">{post.username}</span>
              </div>

              <div className="w-full bg-black aspect-[3/4]">
                <img
                  src={post.image}
                  alt={post.username}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3">
                <p className="text-sm text-gray-400 leading-snug">
                  {post.caption}
                </p>
              </div>

              <div className="px-3 pb-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1">
                    <Heart className="w-5 h-5" strokeWidth={1.5} />
                    <span className="font-medium">{post.likes}</span>
                  </button>

                  <button className="flex items-center gap-1">
                    <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                    <span className="font-medium">{post.comments}</span>
                  </button>

                  <button>
                    <Send className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>

                <button>
                  <Bookmark className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:block fixed top-0 right-0 w-[350px] p-4">
          <aside className="hidden xl:flex flex-col w-[300px] text-white text-sm pl-8 pt-4 box-border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {profile?.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-600" />
                )}
                <div className="flex flex-col leading-tight">
                  <span className="font-semibold text-sm truncate">
                    {profile?.username ?? "username"}
                  </span>
                  <span className="text-xs text-gray-400 truncate">
                    {profile?.fullName ?? ""}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-blue-500 text-xs font-semibold cursor-pointer"
              >
                Chuyển
              </button>
            </div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-gray-400">
                Gợi ý cho bạn
              </span>
              <button className="text-xs font-semibold text-gray-300 hover:text-white">
                Xem tất cả
              </button>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              {suggestions.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-8 h-8 rounded-full object-cover bg-gray-600"
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold truncate">
                        {item.name}
                      </span>
                      <span className="text-xs text-gray-400 truncate">
                        Gợi ý cho bạn
                      </span>
                    </div>
                  </div>
                  <button className="text-blue-500 text-xs font-semibold">
                    Theo dõi
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-auto text-[11px] text-gray-500 leading-[14px] space-y-1">
              <div>
                Giới thiệu · Trợ giúp · Báo chí · API · Việc làm · Quyền riêng
                tư · Điều khoản · Vị trí · Ngôn ngữ · Meta đã xác minh
              </div>
              <div className="pt-1">© 2026 INSTAGRAM FROM META</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
