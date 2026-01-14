import { Outlet, Navigate } from "react-router-dom";

export const Middleware = () => {
  const isLogin = localStorage.getItem("isLogin") === "true";

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Middleware;
