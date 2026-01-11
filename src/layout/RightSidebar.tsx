const suggestions = [
  { name: "Phan Hải Nam", avatar: "/avatar2.jpg" },
  { name: "Phan Hải Nam", avatar: "/avatar3.jpg" },
  { name: "Phan Hải Nam", avatar: "/avatar4.jpg" },
  { name: "Phan Hải Nam", avatar: "/avatar5.jpg" },
];

export default function RightSidebar() {
  return (
    <aside className="hidden xl:flex flex-col w-[300px] text-white text-sm pl-8 pt-4 box-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-600" />
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm truncate">
              nomoney._.nohappy
            </span>
            <span className="text-xs text-gray-400 truncate">phanhainam</span>
          </div>
        </div>
        <button className="text-blue-500 text-xs font-semibold">Chuyển</button>
      </div>

      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold text-gray-400">
          Gợi ý cho bạn
        </span>
        <button className="text-xs font-semibold text-gray-300 hover:text-white">
          Xem tất cả
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {suggestions.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-8 h-8 rounded-full object-cover bg-gray-600"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold truncate">
                  {item.name}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  Gợi ý cho bạn
                </span>
              </div>
            </div>
            <button className="text-blue-500 text-xs font-semibold">
              Theo dõi
            </button>
          </div>
        ))}
      </div>

      <div className="mt-auto text-[11px] text-gray-500 leading-[14px] space-y-1">
        <div>
          Giới thiệu · Trợ giúp · Báo chí · API · Việc làm · Quyền riêng tư ·
          Điều khoản · Vị trí · Ngôn ngữ · Meta đã xác minh
        </div>
        <div className="pt-1">© 2026 INSTAGRAM FROM META</div>
      </div>
    </aside>
  );
}
