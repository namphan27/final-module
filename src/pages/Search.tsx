import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import type { RootState } from "../store/store";
import { closeSearch } from "../slice/slice";
import axiosInstance from "../utils/axios";

interface SearchUser {
  _id: string;
  username: string;
  fullName: string;
  profilePicture?: string;
}

export default function Search() {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.user.isSearchOpen
  );

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState(false);

  // ESC để đóng
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeSearch());
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, dispatch]);

  // debounce search
  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/users/search", {
          params: { q: keyword },
        });
        setResults(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-[999]"
        onClick={() => dispatch(closeSearch())}
      />

      {/* Panel */}
      <div className="fixed top-0 left-[80px] h-full w-[350px]
        bg-[#121212] border-l border-gray-700 shadow-lg
        z-[1000] flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Tìm kiếm</h2>
          <button
            onClick={() => dispatch(closeSearch())}
            className="p-1 rounded hover:bg-gray-800"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <input
            autoFocus
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm theo username, tên..."
            className="w-full p-2 rounded bg-gray-800 text-white outline-none
              focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-4 overflow-auto flex-1 space-y-3">
            {loading && (
              <p className="text-gray-400 text-sm">Đang tìm kiếm...</p>
            )}

            {!loading && keyword && results.length === 0 && (
              <p className="text-gray-400 text-sm">
                Không tìm thấy kết quả
              </p>
            )}

            {results.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 cursor-pointer"
              >
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-600" />
                )}

                <div>
                  <div className="text-sm font-semibold">
                    {user.username}
                  </div>
                  <div className="text-xs text-gray-400">
                    {user.fullName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
