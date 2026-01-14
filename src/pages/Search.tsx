import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search as SearchIcon, X } from "lucide-react";
import { closeSearch, openSearch } from "../slice/slice";
import type { RootState } from "../store/store";

const SIDEBAR_WIDTH = 240; // dễ chỉnh sau này

export default function Search() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.user.isSearchOpen);

  // ESC để đóng
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(closeSearch());
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, dispatch]);

  return (
    <>
      {/* SEARCH BUTTON */}
      <button
        onClick={() =>
          isOpen ? dispatch(closeSearch()) : dispatch(openSearch())
        }
        className={`flex items-center gap-3 p-2 rounded transition w-full
          ${isOpen ? "bg-gray-800 text-white" : "text-white hover:bg-gray-800"}
        `}
      >
        <SearchIcon className="w-5 h-5" />
        Tìm kiếm
      </button>

      {isOpen && (
        <>
          {/* OVERLAY – KHÔNG CHE SIDEBAR */}
          <div
            className="fixed inset-y-0 left-[240px] right-0 bg-black/40 z-[900]"
            onClick={() => dispatch(closeSearch())}
          />

          {/* SEARCH PANEL */}
          <div
            className="fixed top-0 left-[240px] h-full w-[350px]
              bg-[#121212] border-l border-gray-700 shadow-xl
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
                placeholder="Tìm kiếm"
                className="w-full p-2 rounded bg-gray-800 text-white outline-none
                  focus:ring-2 focus:ring-blue-500"
              />

              <div className="mt-4 overflow-auto flex-1">
                <p className="text-gray-400 text-sm">
                  Kết quả tìm kiếm sẽ hiển thị ở đây...
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
