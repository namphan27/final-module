import { Outlet, Navigate, useLocation } from "react-router-dom";

const Middleware = () => {
  const isLogin = false; 
  const location = useLocation();

  if (isLogin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default Middleware;
