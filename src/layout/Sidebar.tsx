import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
} from "lucide-react";
import { openSearch } from "../slice/slice";
import type { RootState } from "../store/store";

const getActive = () =>
  "flex items-center gap-3 p-2 rounded text-white hover:bg-gray-800 transition";

export default function Sidebar() {
  const dispatch = useDispatch();
  const isSearchOpen = useSelector(
    (state: RootState) => state.user.isSearchOpen
  );

  return (
    <div className="fixed top-0 bottom-0 left-0 w-60 bg-[#121212] border-r border-gray-700 p-4 flex flex-col justify-between">
      <div>
        <div className="mb-6 text-2xl font-bold">Instagram</div>

        <div className="flex flex-col gap-2">
          <NavLink to="/" className={getActive}>
            <Home className="w-5 h-5" />
            Trang chủ
          </NavLink>

          {/* SEARCH BUTTON */}
          <button
            onClick={() => dispatch(openSearch())}
            className={`flex items-center gap-3 p-2 rounded transition w-full
              ${isSearchOpen ? "bg-gray-800" : "hover:bg-gray-800"}
            `}
          >
            <SearchIcon className="w-5 h-5" />
            Tìm kiếm
          </button>

          <NavLink to="/explore" className={getActive}>
            <Compass className="w-5 h-5" />
            Khám phá
          </NavLink>

          <NavLink to="/reels" className={getActive}>
            <Film className="w-5 h-5" />
            Reels
          </NavLink>

          <NavLink to="/messages" className={getActive}>
            <MessageCircle className="w-5 h-5" />
            Tin nhắn
          </NavLink>

          <NavLink to="/notifications" className={getActive}>
            <Heart className="w-5 h-5" />
            Thông báo
          </NavLink>

          <NavLink to="/create" className={getActive}>
            <Plus className="w-5 h-5" />
            Tạo
          </NavLink>

          <NavLink to="/profile" className={getActive}>
            <User className="w-5 h-5" />
            Trang cá nhân
          </NavLink>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <NavLink to="/others" className={getActive}>
          <Menu className="w-5 h-5" />
          Xem thêm
        </NavLink>

        <NavLink to="/meta" className={getActive}>
          <Grid2x2 className="w-5 h-5" />
          Meta
        </NavLink>

        <div className="text-gray-400 text-sm mt-6">
          © 2026 Example Inc.
        </div>
      </div>
    </div>
  );
}
