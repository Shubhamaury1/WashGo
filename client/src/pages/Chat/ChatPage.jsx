import ChatList from "../../components/chat/ChatList";
import ChatBox from "../../components/chat/ChatBox";
import MainLayout from "../../layouts/MainLayout";
import Sidebar from "../../components/dashboard/Sidebar";

const ChatPage = () => {
  return (
    <MainLayout>
      <div className="bg-[#f5f7fb] h-[calc(100vh-64px)] overflow-hidden">
        <div className="flex p-6 gap-6 h-full">
          <Sidebar />

          <main className="flex-1 ml-[294px] h-full">
            <div className="bg-white rounded-3xl shadow-lg h-full overflow-hidden">
              <div className="flex h-full">
                <div className="w-[360px] border-r h-full">
                  <ChatList />
                </div>

                <div className="flex-1 h-full">
                  <ChatBox />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatPage;