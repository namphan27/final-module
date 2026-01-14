import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Explore from "./pages/Explore";
import Reels from "./pages/Reels";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import Middleware from "./auth/Middleware";
import Login from "./auth/Login";
import Register from "./auth/Regiter";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Middleware />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/reels" element={<Reels />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/create" element={<Create />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
