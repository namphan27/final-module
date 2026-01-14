import { useEffect, useRef } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  VolumeX,
} from "lucide-react";

const reels = [
  {
    id: 1,
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
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
    <div className="h-screen w-full  overflow-y-scroll snap-y snap-mandatory">
      {reels.map((reel) => (
        <ReelItem key={reel.id} reel={reel} />
      ))}
    </div>
  );
}

function ReelItem({ reel }: { reel: (typeof reels)[number] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.6 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex justify-center items-center snap-start"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-full w-1/2  to-transparent" />
        <div className="absolute right-0 top-0 h-full w-1/2  to-transparent" />
      </div>

      <div className="relative w-[360px] h-[640px] rounded-xl overflow-hidden shadow-2xl bg-black">
        <video
          ref={videoRef}
          src={reel.videoUrl}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
        />

        <div className="absolute top-3 right-3 bg-black/60 rounded-full p-1 z-10">
          <VolumeX size={18} className="text-white" />
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

        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 text-white z-10">
          <Action icon={<Heart size={30} />} value={reel.likes} />
          <Action icon={<MessageCircle size={30} />} value={reel.comments} />
          <Send size={28} />
          <Bookmark size={28} />
        </div>
      </div>
    </div>
  );
}


function Action({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: number;
}) {
  return (
    <button className="flex flex-col items-center">
      {icon}
      <span className="text-sm">{formatNumber(value)}</span>
    </button>
  );
}

function formatNumber(num: number) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}
