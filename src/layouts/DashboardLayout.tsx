import { Outlet } from "react-router-dom";

import AppSidebar from "@/components/sidebar/AppSidebar";
import TopNavbar from "@/components/navbar/TopNavbar";

export default function DashboardLayout() {
  return (
    <div className="flex">

      <AppSidebar />

      <div className="flex flex-1 flex-col">

        <TopNavbar />

        <main className="min-h-screen bg-slate-100 p-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
}