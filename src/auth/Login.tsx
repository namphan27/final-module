import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

export interface LoginPayload {
  email: string;
  password: string;
}
export const isLogin = (data: LoginPayload) => {
  return axiosInstance.post("/auth/login", data);
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await isLogin({ email, password });

      const { user, tokens } = res.data.data;
      const { accessToken, refreshToken } = tokens;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLogin", "true");

      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0f12] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-88">
        <h1 className="text-4xl font-serif text-center mb-6">Instagram</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-[#1a1b1f] border border-[#2e2f33] text-sm mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-2 rounded bg-[#1a1b1f] border border-[#2e2f33] text-sm mb-3"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-xs text-center mb-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#3478f6] rounded text-sm py-2 font-medium w-full"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="border border-[#2e2f33] p-4 text-center rounded text-sm mt-4">
          Bạn chưa có tài khoản?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 cursor-pointer"
          >
            Đăng ký
          </span>
        </div>
      </div>
    </div>
  );
}
