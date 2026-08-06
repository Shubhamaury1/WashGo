import AdminSidebar from "../Admin/AdminSidebar";
import ChatList from "../../components/chat/ChatList";
import ChatBox from "../../components/chat/ChatBox";

const AdminChatPage = () => {
  return (
    <div className="bg-slate-100 overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        <div className="hidden sm:block">
          <AdminSidebar />
        </div>

        {/* Content */}
        <div className="w-full p-2 sm:p-4 lg:p-6 flex-1 overflow-hidden">
          <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg overflow-hidden h-[calc(100vh-90px)] sm:h-[calc(100vh-140px)]">
            <div className="grid grid-cols-3 sm:grid-cols-12 h-full overflow-hidden">
              {/* Chat List */}
              <div className="col-span-1 sm:col-span-4 border-r bg-white overflow-hidden">
                <ChatList />
              </div>

              {/* Chat Box */}
              <div className="col-span-2 sm:col-span-8 bg-gray-50 overflow-hidden">
                <ChatBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChatPage;



