import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import RightSidebar from "../layout/RightSidebar";

interface Post {
  id: number;
  username: string;
  avatar: string;
  image: string;
  likes: string;
  comments: string;
  caption: string;
}

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
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
