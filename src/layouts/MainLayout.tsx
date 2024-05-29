import Header from "@/components/shared/Header";
import SideBar from "@/components/shared/SideBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex bg-[#F0EBD6] no-scrollbar">
      <SideBar />
      <main className="flex-1 ">
        <Header />
        <div className="mt-[100px] px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
