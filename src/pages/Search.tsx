import { useDispatch, useSelector } from "react-redux";
import { Search as SearchIcon, X } from "lucide-react";
import { closeSearch, openSearch } from "../slice/slice";
import type { RootState } from "../store/store";

export default function Search() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.user.isSearchOpen);

  return (
    <>
      <button
        onClick={() => (isOpen ? dispatch(closeSearch()) : dispatch(openSearch()))}
        className="flex items-center gap-3 p-2 rounded text-white hover:bg-gray-800 transition w-full"
      >
        <SearchIcon className="w-5 h-5" />
        Tìm kiếm
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => dispatch(closeSearch())}
          />

          <div className="fixed top-0 left-[240px] h-full w-[350px] sm:w-[400px] bg-[#121212] border-l border-gray-700 shadow-lg z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Tìm kiếm</h2>
              <button
                onClick={() => dispatch(closeSearch())}
                className="p-1 rounded hover:bg-gray-800"
              >
                <X onClick={() => dispatch(closeSearch())} className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
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
    </>
  );
}
