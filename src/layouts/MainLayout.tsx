import Header from "@/components/shared/Header";
import SideBar from "@/components/shared/SideBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex items-center h-screen max-h-screen overflow-hidden bg-[#F4F4F4] no-scrollbar">
      <div>
        <SideBar />
      </div>
      <main className="flex-1">
        <Header />
        <div className="px-10 h-screen  max-h-screen overflow-y-scroll no-scrollbar">
          <div className="mt-[100px]">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
