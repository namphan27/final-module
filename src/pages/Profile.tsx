import React, { useEffect, useState } from "react";
import { Settings, Grid, Bookmark, Contact, Camera, X } from "lucide-react";
import axiosInstance from "../utils/axios";

export const getMyProfile = () => {
  return axiosInstance.get("/users/profile");
};

export const updateMyProfile = (data: FormData) => {
  return axiosInstance.patch("/users/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


type ProfileTab = "posts" | "saved" | "tagged";

export interface UserProfile {
  username: string;
  fullName: string;
  avatarUrl?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  bio?: string;
}

const DEFAULT_USER: UserProfile = {
  username: "username",
  fullName: "Full Name",
  postsCount: 0,
  followersCount: 0,
  followingCount: 0,
  bio: "Chưa có tiểu sử",
};

export default function Profile() {
  const [user, setUser] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) return JSON.parse(savedProfile);

    const loginUser = localStorage.getItem("user");
    if (loginUser) {
      const parsed = JSON.parse(loginUser);
      return {
        username: parsed.account,
        fullName: parsed.account,
        postsCount: 0,
        followersCount: 0,
        followingCount: 0,
        bio: "Chưa có tiểu sử",
      };
    }

    return DEFAULT_USER;
  });

  const [form, setForm] = useState<UserProfile>(user);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(user));
  }, [user]);

  const handleAvatarChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setUser((prev) => ({
        ...prev,
        avatarUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen text-white bg-[#0e0f12]">
      <div className="max-w-[935px] mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row items-center md:items-start mb-10">
          <div className="md:mr-24 mb-6 md:mb-0">
            <label className="cursor-pointer">
              <div className="w-32 h-32 md:w-36 md:h-36 bg-[#262626] rounded-full overflow-hidden flex items-center justify-center">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera size={42} className="text-gray-400" />
                )}
              </div>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleAvatarChange(e.target.files[0])
                }
              />
            </label>
          </div>

          <section className="flex-grow">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xl">{user.username}</h2>

              <button
                onClick={() => {
                  setForm(user);
                  setIsEditing(true);
                }}
                className="bg-[#363636] px-4 py-1.5 rounded-lg text-sm font-semibold"
              >
                Chỉnh sửa trang cá nhân
              </button>

              <Settings className="cursor-pointer" />
            </div>

            <div className="flex gap-10 mb-4">
              <span>
                <strong>{user.postsCount}</strong> bài viết
              </span>
              <span>
                <strong>{user.followersCount}</strong> người theo dõi
              </span>
              <span>
                Đang theo dõi <strong>{user.followingCount}</strong>
              </span>
            </div>

            <div>
              <div className="font-semibold">{user.fullName}</div>
              <div className="text-gray-400 text-sm">{user.bio}</div>
            </div>
          </section>
        </header>

        <div className="border-t border-gray-800 flex justify-center space-x-12">
          <TabItem
            icon={<Grid size={12} />}
            label="Bài viết"
            active={activeTab === "posts"}
            onClick={() => setActiveTab("posts")}
          />
          <TabItem
            icon={<Bookmark size={12} />}
            label="Đã lưu"
            active={activeTab === "saved"}
            onClick={() => setActiveTab("saved")}
          />
          <TabItem
            icon={<Contact size={12} />}
            label="Được gắn thẻ"
            active={activeTab === "tagged"}
            onClick={() => setActiveTab("tagged")}
          />
        </div>

        <div className="mt-16">
          {activeTab === "posts" && (
            <EmptyState
              icon={<Camera size={48} />}
              title="Chia sẻ ảnh"
              desc="Khi bạn chia sẻ ảnh, ảnh sẽ xuất hiện trên trang cá nhân của bạn."
            />
          )}

          {activeTab === "saved" && (
            <EmptyState
              icon={<Bookmark size={48} />}
              title="Đã lưu"
              desc="Chỉ mình bạn có thể xem những gì bạn đã lưu."
            />
          )}

          {activeTab === "tagged" && (
            <EmptyState
              icon={<Contact size={48} />}
              title="Ảnh có mặt bạn"
              desc="Khi ai đó gắn thẻ bạn trong ảnh, ảnh sẽ xuất hiện tại đây."
            />
          )}
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-xl w-[400px] p-6 relative">
            <X
              onClick={() => setIsEditing(false)}
              className="absolute right-4 top-4 cursor-pointer"
            />

            <h3 className="text-lg font-semibold mb-4">
              Chỉnh sửa trang cá nhân
            </h3>

            <Input
              label="Username"
              value={form.username}
              onChange={(v) => setForm({ ...form, username: v })}
            />

            <Input
              label="Họ tên"
              value={form.fullName}
              onChange={(v) => setForm({ ...form, fullName: v })}
            />

            <Textarea
              label="Tiểu sử"
              value={form.bio || ""}
              onChange={(v) => setForm({ ...form, bio: v })}
            />

            <button
              onClick={() => {
                setUser(form);
                localStorage.setItem("profile", JSON.stringify(form));
                setIsEditing(false);
              }}
              className="w-full mt-4 bg-blue-500 py-2 rounded-lg font-semibold"
            >
              Lưu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const TabItem = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-1 py-4 cursor-pointer transition ${
      active ? "border-t border-white -mt-px" : "text-gray-500 hover:text-white"
    }`}
  >
    {icon}
    <span className="text-xs font-bold uppercase">{label}</span>
  </div>
);

const EmptyState = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="text-center text-gray-400">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl text-white font-semibold mb-2">{title}</h3>
    <p className="text-sm">{desc}</p>
  </div>
);

const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="mb-3">
    <label className="text-sm text-gray-400">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-1 bg-[#262626] rounded px-3 py-2 outline-none"
    />
  </div>
);

const Textarea = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="mb-3">
    <label className="text-sm text-gray-400">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-1 bg-[#262626] rounded px-3 py-2 outline-none resize-none"
      rows={3}
    />
  </div>
);
