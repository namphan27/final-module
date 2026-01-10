import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#0e0f12] text-white flex flex-col items-center justify-center px-4">
      <div className="flex items-center justify-center gap-12 max-w-[900px] w-full">
        
        <div className="hidden md:flex relative w-[350px] h-[500px] mr-[20%]">
          <img
            src="https://picsum.photos/300/500?random=1"
            className="absolute rounded-3xl w-[250px] h-[420px] top-8 left-0 object-cover shadow-xl"
          />
          <img
            src="https://picsum.photos/300/500?random=2"
            className="absolute rounded-3xl w-[250px] h-[420px] -top-4 left-20 object-cover shadow-xl"
          />
          <img
            src="https://picsum.photos/300/500?random=3"
            className="absolute rounded-3xl w-[250px] h-[420px] top-16 left-36 object-cover shadow-xl"
          />
        </div>

        <div className="flex flex-col gap-4 w-full max-w-[350px]">
          <h1 className="text-4xl font-serif text-center mb-2">Instagram</h1>

          <input
            placeholder="Số điện thoại, tên người dùng hoặc email"
            className="w-full p-2 rounded bg-[#1a1b1f] border border-[#2e2f33] text-sm"
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-2 rounded bg-[#1a1b1f] border border-[#2e2f33] text-sm"
          />

          <button className="bg-[#3478f6] rounded text-sm py-2 font-medium">
            Đăng nhập
          </button>

          <div className="text-center text-xs opacity-70">HOẶC</div>

          <button className="flex items-center justify-center gap-2 text-blue-400 text-sm">
            Đăng nhập bằng Facebook
          </button>

          <button className="text-xs opacity-70">Quên mật khẩu?</button>

          <div className="border border-[#2e2f33] p-4 text-center rounded text-sm mt-2">
            Bạn chưa có tài khoản ư?{" "}
            <span onClick={() => navigate("/register")} className="text-blue-400 cursor-pointer">Đăng ký</span>
          </div>
        </div>
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
