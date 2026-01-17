import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axiosInstance.post(`/auth/verify-email/${token}`);
        setStatus("success");

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        setStatus("error");
        console.error(error);
      }
    };

    if (token) verifyEmail();
    else setStatus("error");
  }, [token, navigate]);

  if (status === "loading") return <div> Đang xác minh email...</div>;
  if (status === "error") return <div> Link xác minh không hợp lệ</div>;

  return <div> Xác minh email thành công </div>;
}
