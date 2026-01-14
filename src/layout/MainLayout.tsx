import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
// import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#121212] text-white w-full">
      <aside className="w-60 border-r border-gray-800 p-4">
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        {/* <Header /> */}

        <section className="flex-1 overflow-auto min-w-0">
          <Outlet />
        </section>

        <section>
          <Message />
        </section>
        <Footer />
      </main>
    </div>
  );
}
