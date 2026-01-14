import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

export interface Register {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}
export const register = (data: Register) => {
  return axiosInstance.post("/auth/register", data);
};
export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setLoading(true);
      await register(form);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <input
            className="w-full p-2 rounded bg-[#1a1b1f] border border-[#2e2f33] text-sm mb-3"
            placeholder="Số di động hoặc email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full p-2 rounded bg-[#1a1b1f] border border-[#2e2f33] text-sm mb-3"
            placeholder="Mật khẩu"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
          />
          <input
            className="w-full p-2 rounded bg-[#1a1b1f] border border-[#2e2f33] text-sm mb-3"
            placeholder="Nhập lại mật khẩu"
            type="password"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
          <input
            className="w-full p-2 rounded bg-[#1a1b1f] border border-[#2e2f33] text-sm mb-3"
            placeholder="Tên đầy đủ"
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />

          <input
            className="w-full p-2 rounded bg-[#1a1b1f] border border-[#2e2f33] text-sm mb-3"
            placeholder="Tên người dùng"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#3478f6] rounded text-sm py-2 font-medium w-full cursor-pointer"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>
      </div>

      <div className="border border-[#26272b] rounded p-4 text-center w-full max-w-[360px] mt-3 text-sm">
        Bạn có tài khoản?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          Đăng nhập
        </span>
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
