import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#0e0f12] text-white flex flex-col items-center justify-center px-4">
      <div className="flex flex-col w-full max-w-[360px] border border-[#26272b] rounded p-6 gap-4">
        
        <h1 className="text-4xl font-serif text-center mb-1">Instagram</h1>

        <p className="text-center text-sm opacity-80">
          Đăng ký để xem ảnh và video từ bạn bè.
        </p>

        <button className="bg-[#3478f6] flex items-center justify-center text-sm rounded py-2 font-medium gap-2">
          <span className="text-white">Đăng nhập bằng Facebook</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-[#2e2f33]" />
          <span className="text-xs opacity-70">HOẶC</span>
          <div className="flex-1 h-[1px] bg-[#2e2f33]" />
        </div>

        <input className="input" placeholder="Số di động hoặc email" />
        <input className="input" placeholder="Mật khẩu" type="password" />
        <input className="input" placeholder="Tên đầy đủ" />
        <input className="input" placeholder="Tên người dùng" />

        <p className="text-[11px] opacity-70 leading-snug">
          Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Instagram.{" "}
          <span className="text-blue-400">Tìm hiểu thêm</span>
        </p>

        <p className="text-[11px] opacity-70 leading-snug">
          Bằng cách đăng ký, bạn đồng ý với{" "}
          <span className="text-blue-400">Điều khoản</span>,{" "}
          <span className="text-blue-400">Chính sách quyền riêng tư</span> và{" "}
          <span className="text-blue-400">Chính sách cookie</span> của chúng tôi.
        </p>

        <button className="bg-[#3478f6] rounded text-sm py-2 font-medium text-white">
          Đăng ký
        </button>
      </div>

      <div className="border border-[#26272b] rounded p-4 text-center w-full max-w-[360px] mt-3 text-sm">
        Bạn có tài khoản?{" "}
        <span onClick={() => navigate("/login")} className="text-blue-400 cursor-pointer hover:underline">Đăng nhập</span>
      </div>

      <footer className="text-xs opacity-60 mt-10 flex flex-wrap gap-3 justify-center max-w-[800px]">
        <span>Meta</span>
        <span>Giới thiệu</span>
        <span>Blog</span>
        <span>API</span>
        <span>Quyền riêng tư</span>
        <span>Điều khoản</span>
        <span>Meta AI</span>
        <span>© 2026 Instagram from Meta</span>
      </footer>
    </div>
  );
}
