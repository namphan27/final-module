import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Compass,
  Film,
  MessageCircle,
  Heart,
  Plus,
  User,
  Menu,
  Grid2x2,
  Search as SearchIcon,
  X,
} from "lucide-react";

const getActive = () =>
  "flex items-center gap-3 p-2 rounded text-white hover:bg-gray-800 transition";

export default function Sidebar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 bg-[#121212] border-r border-gray-700 p-4 flex flex-col justify-between transition-all duration-300
        ${isSearchOpen ? "w-20" : "w-80"}
      `}
    >
      <div>
        {!isSearchOpen && <div className="mb-6 text-2xl font-bold">Instagram</div>}

        <div className="flex flex-col gap-2">
          <NavLink to="/" className={getActive}>
            <Home className="w-5 h-5" />
            {!isSearchOpen && "Trang chủ"}
          </NavLink>

          <button
            onClick={toggleSearch}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition w-full"
          >
            <SearchIcon className="w-5 h-5" />
            {!isSearchOpen && "Tìm kiếm"}
          </button>

          <NavLink to="/explore" className={getActive}>
            <Compass className="w-5 h-5" />
            {!isSearchOpen && "Khám phá"}
          </NavLink>

          <NavLink to="/reels" className={getActive}>
            <Film className="w-5 h-5" />
            {!isSearchOpen && "Reels"}
          </NavLink>

          <NavLink to="/messages" className={getActive}>
            <MessageCircle className="w-5 h-5" />
            {!isSearchOpen && "Tin nhắn"}
          </NavLink>

          <NavLink to="/notifications" className={getActive}>
            <Heart className="w-5 h-5" />
            {!isSearchOpen && "Thông báo"}
          </NavLink>

          <NavLink to="/create" className={getActive}>
            <Plus className="w-5 h-5" />
            {!isSearchOpen && "Tạo"}
          </NavLink>

          <NavLink to="/profile" className={getActive}>
            <User className="w-5 h-5" />
            {!isSearchOpen && "Trang cá nhân"}
          </NavLink>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <NavLink to="/others" className={getActive}>
          <Menu className="w-5 h-5" />
          {!isSearchOpen && "Xem thêm"}
        </NavLink>

        <NavLink to="/meta" className={getActive}>
          <Grid2x2 className="w-5 h-5" />
          {!isSearchOpen && "Meta"}
        </NavLink>

        <div className="text-gray-400 text-sm mt-6">© 2026 Example Inc.</div>
      </div>

      {isSearchOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[999]"
            onClick={() => setIsSearchOpen(false)}
          />

          <div className="fixed top-0 left-[80px] h-full w-[350px] bg-[#121212] border-l border-gray-700 shadow-lg z-[1000] flex flex-col transition-all duration-300">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Tìm kiếm</h2>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded hover:bg-gray-800"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </button>
            </div>

            <div className="p-4 flex flex-col flex-1">
              <input
                autoFocus
                placeholder="Tìm kiếm"
                className="w-full p-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-4 overflow-auto flex-1 text-white">
                <p className="text-gray-400 text-sm">
                  Kết quả tìm kiếm sẽ hiển thị ở đây...
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
