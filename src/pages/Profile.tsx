import { useEffect, useState, useRef } from "react";
import { Settings, Grid, Bookmark, Contact, Camera, X } from "lucide-react";
import axiosInstance from "../utils/axios";
import type { UserProfile, ProfileForm, ProfileTab } from "../type/profile";

const getMyProfile = () => axiosInstance.get("/users/profile");

const updateMyProfile = (data: FormData) =>
  axiosInstance.patch("/users/profile", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [form, setForm] = useState<ProfileForm | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
  const [showSettings, setShowSettings] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const res = await getMyProfile();
        const u = res.data.data;

        const profile: UserProfile = {
          username: u.username,
          fullName: u.fullName,
          avatarUrl: u.profilePicture,
          bio: u.bio || "Chưa có tiểu sử",
          postsCount: u.postsCount || 0,
          followersCount: u.followersCount || 0,
          followingCount: u.followingCount || 0,
        };

        setUser(profile);
        localStorage.setItem("profile", JSON.stringify(profile));
      } catch (err: any) {
        if (err.response?.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        } else {
          console.error("Fetch profile failed", err);
        }
      }
    };

    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    if (!form || !user) return;

    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("bio", form.bio);
      if (form.avatarFile) {
        formData.append("profilePicture", form.avatarFile);
      }

      const res = await updateMyProfile(formData);
      const updated = res.data.data;

      const newProfile: UserProfile = {
        ...user,
        fullName: updated.fullName,
        bio: updated.bio,
        avatarUrl: updated.profilePicture,
      };

      setUser(newProfile);
      localStorage.setItem("profile", JSON.stringify(newProfile));
      setIsEditing(false);
    } catch (err) {
      console.error("Update profile failed", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (!user) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen text-white bg-[#0e0f12]">
      <div className="max-w-234 mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row items-center md:items-start mb-10">
          <div className="md:mr-24 mb-6 md:mb-0">
            <div
              className="w-36 h-36 bg-[#262626] rounded-full overflow-hidden flex items-center justify-center cursor-pointer relative group"
              onClick={() => fileInputRef.current?.click()}
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera size={42} className="text-gray-400" />
              )}

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-sm font-semibold transition">
                Đổi ảnh
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setForm({
                  fullName: user.fullName,
                  bio: user.bio || "",
                  avatarFile: file,
                });
                setIsEditing(true);
              }}
            />
          </div>

          <section className="grow">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xl">{user.username}</h2>

              <button
                onClick={() => {
                  setForm({
                    fullName: user.fullName,
                    bio: user.bio || "",
                  });
                  setIsEditing(true);
                }}
                className="bg-[#363636] px-4 py-1.5 rounded-lg text-sm font-semibold"
              >
                Chỉnh sửa trang cá nhân
              </button>

              <Settings
                className="cursor-pointer"
                onClick={() => setShowSettings(true)}
              />
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
      </div>

      {isEditing && form && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-xl w-100 p-6 relative">
            <X
              onClick={() => setIsEditing(false)}
              className="absolute right-4 top-4 cursor-pointer"
            />

            <h3 className="text-lg font-semibold mb-4">
              Chỉnh sửa trang cá nhân
            </h3>

            {form.avatarFile && (
              <img
                src={URL.createObjectURL(form.avatarFile)}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
              />
            )}

            <Input
              label="Họ tên"
              value={form.fullName}
              onChange={(v) => setForm({ ...form, fullName: v })}
            />

            <Textarea
              label="Tiểu sử"
              value={form.bio}
              onChange={(v) => setForm({ ...form, bio: v })}
            />

            <button
              onClick={handleSaveProfile}
              className="w-full mt-4 bg-blue-500 py-2 rounded-lg font-semibold"
            >
              Lưu
            </button>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowSettings(false)}
          />

          <div className="relative w-full max-w-105 bg-[#262626] rounded-xl overflow-hidden">
            {[
              "Ứng dụng và trang web",
              "Mã QR",
              "Thông báo",
              "Cài đặt và quyền riêng tư",
              "Meta đã xác minh",
              "Giám sát",
              "Hoạt động đăng nhập",
            ].map((item) => (
              <div
                key={item}
                className="px-6 py-4 text-center text-sm border-b border-gray-700 hover:bg-[#333] cursor-pointer"
              >
                {item}
              </div>
            ))}

            <div
              onClick={handleLogout}
              className="px-6 py-4 text-center text-sm text-red-500 hover:bg-[#333] cursor-pointer"
            >
              Đăng xuất
            </div>

            <div
              onClick={() => setShowSettings(false)}
              className="px-6 py-4 text-center text-sm font-semibold hover:bg-[#333] cursor-pointer"
            >
              Hủy
            </div>
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
    className={`flex items-center gap-1 py-4 cursor-pointer ${
      active ? "border-t border-white -mt-px" : "text-gray-500"
    }`}
  >
    {icon}
    <span className="text-xs font-bold uppercase">{label}</span>
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
      rows={3}
      className="w-full mt-1 bg-[#262626] rounded px-3 py-2 outline-none resize-none"
    />
  </div>
);
