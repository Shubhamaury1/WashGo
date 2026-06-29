import AdminSidebar from "../Admin/AdminSidebar";
import ChatList from "../../components/chat/ChatList";
import ChatBox from "../../components/chat/ChatBox";

const AdminChatPage = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Content */}
        <div className="ml-[310px] w-full p-6">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden h-[calc(100vh-70px)]">
            <div className="grid grid-cols-12 h-full">
              {/* Chat List */}
              <div className="col-span-4 border-r bg-white">
                <ChatList />
              </div>

              {/* Chat Box */}
              <div className="col-span-8 bg-gray-50">
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
