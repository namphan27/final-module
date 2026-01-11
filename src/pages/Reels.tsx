import { useEffect, useRef } from "react";
import { Heart, MessageCircle, Send, Bookmark, VolumeX } from "lucide-react";

const reels = [
  {
    id: 1,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp3",
    caption: "Tag you love 🥺💜🔵 .... ... xem thêm",
    user: {
      username: "mr_aayushmahto4683",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    likes: 125000,
    comments: 811,
    music: "Tona Lago Na - Priyanka Si",
    taggedCount: 4,
  },
];

export default function Reels() {
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#0f0f0f]">
      <div className="relative w-full flex justify-center">
        <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-black/80 to-transparent" />

        {reels.map((reel) => (
          <ReelItem key={reel.id} reel={reel} />
        ))}
      </div>
    </div>
  );
}

function ReelItem({ reel }: { reel: (typeof reels)[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        entry.isIntersecting
          ? videoRef.current.play()
          : videoRef.current.pause();
      },
      { threshold: 0.7 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10 my-6 w-[360px] h-[640px] rounded-xl overflow-hidden bg-black shadow-2xl">
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
      />

      <div className="absolute top-3 right-3 bg-black/60 rounded-full p-1 z-10">
        <VolumeX size={18} color="white" />
      </div>

      <div className="absolute left-4 bottom-24 text-white max-w-[70%] z-10">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={reel.user.avatar}
            className="w-8 h-8 rounded-full"
            alt=""
          />
          <span className="font-semibold text-sm">
            {reel.user.username}
          </span>
          <button className="ml-2 border border-white rounded-full px-3 text-xs">
            Theo dõi
          </button>
        </div>

        <p className="text-sm line-clamp-3">{reel.caption}</p>

        <div className="mt-3 text-xs bg-white/20 px-3 py-1 rounded-full w-fit">
          🎵 {reel.music} · {reel.taggedCount} người
        </div>
      </div>

      {/* ACTIONS */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 text-white z-10">
        <button className="flex flex-col items-center">
          <Heart size={30} />
          <span className="text-sm">{formatNumber(reel.likes)}</span>
        </button>

        <button className="flex flex-col items-center">
          <MessageCircle size={30} />
          <span className="text-sm">{formatNumber(reel.comments)}</span>
        </button>

        <Send size={28} />
        <Bookmark size={28} />
      </div>
    </div>
  );
}

function formatNumber(num: number) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}
