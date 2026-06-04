// import { Outlet } from "react-router-dom";
// import Navbar from "../../components/navbar/Navbar";
// import AdminSidebar from "./AdminSidebar";

// const AdminLayout = () => {
//   return (
//     <div className="bg-[#f5f7fb] min-h-screen">
//       <Navbar />

//       <div className="max-w-[1800px] mx-auto p-6">
//         <div className="flex gap-6">
//           <AdminSidebar />

//           <main className="flex-1 min-w-0">
//             <Outlet />
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="bg-[#f5f7fb] min-h-screen">
      <Navbar />

      <div className="flex p-6 gap-6">
        <AdminSidebar />

        <main className="flex-1 ml-[304px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;