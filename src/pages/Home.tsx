import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import type { Post, NewsfeedResponse } from "../type/post";
import type { UserProfile } from "type/profile";

const suggestions = [
  { name: "Phan Hải Nam", avatar: "/avatar2.jpg" },
  { name: "Phan Hải Nam", avatar: "/avatar3.jpg" },
  { name: "Phan Hải Nam", avatar: "/avatar4.jpg" },
  { name: "Phan Hải Nam", avatar: "/avatar5.jpg" },
];
interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  userId: {
    _id: string;
    username: string;
    profilePicture: string;
  };
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>(
    {}
  );
  const [postComments, setPostComments] = useState<Record<string, Comment[]>>(
    {}
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const createComment = async (postId: string) => {
    const content = commentInputs[postId];
    if (!content?.trim()) return;

    try {
      const res = await axiosInstance.post(`/posts/${postId}/comments`, {
        content,
        parentCommentId: null,
      });

      if (res.data.success) {
        setPostComments((prev) => ({
          ...prev,
          [postId]: [res.data.data, ...(prev[postId] || [])],
        }));

        setCommentInputs((prev) => ({
          ...prev,
          [postId]: "",
        }));
      }
    } catch (err) {
      console.error("Create comment failed", err);
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      const res = await axiosInstance.get(`/posts/${postId}/comments`, {
        params: { limit: 10, offset: 0 },
      });

      if (res.data.success) {
        setPostComments((prev) => ({
          ...prev,
          [postId]: res.data.data.comments,
        }));
      }
    } catch (err) {
      console.error("Fetch comments failed", err);
    }
  };

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axiosInstance.get<NewsfeedResponse>("/posts/feed", {
          params: {
            limit: 20,
            offset: 0,
          },
        });

        if (res.data.success) {
          setPosts(res.data.data.posts);
        }
      } catch (error) {
        console.error("Failed to fetch newsfeed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  return (
    <div className="relative w-full flex justify-center mt-10">
      <div className="w-full max-w-125 space-y-6">
        <div className="flex flex-col items-center w-full max-w-118">
          {loading && (
            <div className="flex justify-center items-center py-10">
              <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {!loading &&
            posts.map((post) => (
              <div
                key={post._id}
                className="w-full rounded-lg mb-6 border border-gray-700 bg-[#1e1e1e] overflow-hidden"
              >
                <div className="flex items-center p-3 gap-3 border-b border-gray-700">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={post.user?.profilePicture || "/avatar-default.png"}
                    alt={post.user?.username || "Unknown user"}
                  />

                  <span className="font-semibold text-sm">
                    {post.user?.username || "Unknown user"}
                  </span>
                </div>

                <div className="w-full bg-black aspect-3/4">
                  {post.mediaType === "image" && post.image && (
                    <img
                      src={post.image}
                      alt={post.caption}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {post.mediaType === "video" && post.video && (
                    <video controls className="w-full h-full object-cover">
                      <source src={post.video} />
                    </video>
                  )}
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

                    <button
                      className="flex items-center gap-1"
                      onClick={() => fetchComments(post._id)}
                    >
                      <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                      <span className="font-medium">{post.comments}</span>
                    </button>

                    <Send className="w-5 h-5" strokeWidth={1.5} />
                  </div>

                  <Bookmark className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="px-3 space-y-2 text-sm">
                  {(postComments[post._id] || []).map((c) => (
                    <div key={c._id} className="flex gap-2">
                      <img
                        src={c.userId.profilePicture}
                        className="w-6 h-6 rounded-full"
                      />
                      <div>
                        <span className="font-semibold mr-1">
                          {c.userId.username}
                        </span>
                        {c.content}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-3 py-2 border-t border-gray-700">
                  <input
                    value={commentInputs[post._id] || ""}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({
                        ...prev,
                        [post._id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" && createComment(post._id)
                    }
                    placeholder="Thêm bình luận..."
                    className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-500"
                  />
                </div>
              </div>
            ))}
        </div>

        <div className="hidden lg:block fixed top-0 right-0 w-88 p-4">
          <aside className="hidden xl:flex flex-col w-75 text-white text-sm pl-8 pt-4 box-border">
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

            <div className="mt-auto text-[11px] text-gray-500 space-y-1">
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
