import React from "react";
import { Settings, Plus, Grid, Bookmark, Contact, Camera } from "lucide-react";

// types.ts
export interface UserProfile {
  username: string;
  fullName: string;
  avatarUrl?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  bio?: string;
}


export const MOCK_USER: UserProfile = {
  username: "phanhainam2720",
  fullName: "Phan Hai Nam",
  postsCount: 0,
  followersCount: 0,
  followingCount: 0,
  bio: "Ghi chú...",
};

export default function Profile() {
  const user = MOCK_USER;

  return (
    <div className="min-h-screen text-white font-sans antialiased">
      <div className="max-w-[935px] mx-auto px-4 py-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-center md:items-start mb-12">
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-24">
            <div className="w-32 h-32 md:w-36 md:h-36 bg-[#262626] rounded-full flex items-center justify-center relative cursor-pointer overflow-hidden">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <Camera size={44} className="text-gray-400" />
              )}
              <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-1 border-4 border-black">
                <Plus size={14} className="text-white" strokeWidth={3} />
              </div>
            </div>
          </div>

          <section className="flex-grow">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <h2 className="text-xl font-normal">{user.username}</h2>
              <div className="flex gap-2">
                <button className="bg-[#363636] hover:bg-[#262626] px-4 py-1.5 rounded-lg text-sm font-semibold transition">
                  Chỉnh sửa trang cá nhân
                </button>
                <button className="bg-[#363636] hover:bg-[#262626] px-4 py-1.5 rounded-lg text-sm font-semibold transition">
                  Xem kho lưu trữ
                </button>
              </div>
              <Settings className="cursor-pointer" size={24} />
            </div>

            <div className="flex space-x-10 mb-5">
              <span><strong className="font-semibold">{user.postsCount}</strong> bài viết</span>
              <span><strong className="font-semibold">{user.followersCount}</strong> người theo dõi</span>
              <span>Đang theo dõi <strong className="font-semibold">{user.followingCount}</strong> người dùng</span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-sm">{user.fullName}</span>
              {user.bio && <span className="text-sm text-gray-400 mt-1">{user.bio}</span>}
            </div>
          </section>
        </header>

        {/* Highlights */}
        <div className="flex flex-col items-center w-20 mb-12 cursor-pointer group">
          <div className="w-18 h-18 md:w-20 md:h-20 border border-gray-800 rounded-full flex items-center justify-center mb-2 group-hover:bg-[#121212]">
            <Plus size={40} className="text-gray-600" strokeWidth={1} />
          </div>
          <span className="text-xs font-semibold">Mới</span>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-800 flex justify-center space-x-12">
          <TabItem icon={<Grid size={12} />} label="Bài viết" active />
          <TabItem icon={<Bookmark size={12} />} label="Đã lưu" />
          <TabItem icon={<Contact size={12} />} label="Được gắn thẻ" />
        </div>

        {/* Empty States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <EmptyCard 
            title="Chia sẻ ảnh" 
            desc="Khi bạn chia sẻ ảnh, ảnh sẽ xuất hiện trên trang cá nhân của bạn." 
            action="Chia sẻ ảnh đầu tiên của bạn" 
          />
          <EmptyCard 
            title="Thêm ảnh đại diện" 
            desc="Hãy thêm ảnh đại diện để bạn bè biết đó là bạn." 
            action="Thêm ảnh đại diện" 
          />
        </div>
      </div>
    </div>
  );
}

// --- Sub-components để code gọn sạch hơn ---

interface TabItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const TabItem: React.FC<TabItemProps> = ({ icon, label, active }) => (
  <div className={`flex items-center space-x-1 py-4 cursor-pointer transition ${active ? 'border-t border-white -mt-[1px]' : 'text-gray-500 hover:text-white'}`}>
    {icon}
    <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
  </div>
);

interface EmptyCardProps {
  title: string;
  desc: string;
  action: string;
}

const EmptyCard: React.FC<EmptyCardProps> = ({ title, desc, action }) => (
  <div className="border border-gray-800 rounded-lg p-12 flex flex-col items-center text-center">
    <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-4">
      <Camera size={32} />
    </div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-sm text-gray-400 mb-6">{desc}</p>
    <button className="text-blue-500 text-sm font-bold hover:text-white transition">{action}</button>
  </div>
);