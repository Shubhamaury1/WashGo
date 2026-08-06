import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import AdminSidebar from "./AdminSidebar";
import { useState } from "react";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-[#f5f7fb] min-h-screen">
      <Navbar />

      {/* Mobile Dashboard Header */}
      <div className="md:hidden px-6 py-4 flex items-end gap-3 bg-gradient-to-r from-blue-50 to-purple-50">
      
        <h1 className="text-3xl font-bold text-slate-800 ml-10 mt-5">Dashboard</h1>
      </div>

      <div className="flex p-6 gap-6">
        <AdminSidebar />

        <main className="flex-1 md:ml-[304px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;