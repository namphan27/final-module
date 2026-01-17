import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

interface ExplorePost {
  _id: string;
  caption: string;
  image: string | null;
  video: string | null;
  mediaType: "image" | "video";
  likes: number;
  comments: number;
  engagementScore: number;
  createdAt: string;
  user: {
    _id: string;
    username: string;
    fullName: string;
    profilePicture: string;
  };
}


export default function Explore() {
  const [posts, setPosts] = useState<ExplorePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchExplore = async () => {
      try {
        const res = await axiosInstance.get("/posts/explore", {
          params: {
            page,
            limit: 20,
          },
        });

        if (res.data.success) {
          setPosts(res.data.data.posts);
        }
        setPage
      } catch (error) {
        console.error("Failed to fetch explore posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExplore();
  }, [page]);

  return (
    <div className="w-full min-h-screen bg-[#111] text-white">
      {loading && (
        <div className="flex justify-center py-10 text-gray-400">
          Loading explore...
        </div>
      )}

      <div
        className="
          max-w-300
          mx-auto
          px-2
          grid
          grid-cols-3
          sm:grid-cols-4
          xl:grid-cols-5
          gap-1
        "
      >
        {posts.map((post) => (
          <div
            key={post._id}
            className="aspect-square overflow-hidden bg-black"
          >
            {post.mediaType === "image" && post.image && (
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            )}

            {post.mediaType === "video" && post.video && (
              <video
                muted
                className="w-full h-full object-cover"
              >
                <source src={post.video} />
              </video>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
