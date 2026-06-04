
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="bg-slate-100 min-h-screen">
      {/* Fixed Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="flex gap-8">
          {/* Sidebar */}
          <AdminSidebar />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;