import { useState } from "react";
import ChatList from "../../components/chat/ChatList";
import ChatBox from "../../components/chat/ChatBox";
import MainLayout from "../../layouts/MainLayout";
import Sidebar from "../../components/dashboard/Sidebar";

const ChatPage = () => {
  const [showChatBox, setShowChatBox] = useState(false);

  const handleSelectChat = () => {
    setShowChatBox(true);
  };

  const handleBackToList = () => {
    setShowChatBox(false);
  };

  return (
    <MainLayout>
      <div className="bg-[#f5f7fb] h-[calc(100vh-64px)] overflow-hidden">
        <div className="flex p-3 md:p-6 gap-3 md:gap-6 h-full">
          <Sidebar />
          

          <main className="flex-1 md:ml-[294px] h-full w-full md:w-auto">
           
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg h-full overflow-hidden">
              
              <div className="flex h-full">
                {/* Chat List - Full width on mobile if not in chat, hidden on mobile when in chat, always visible on md+ */}
                <div
                  className={`${
                    showChatBox ? "hidden" : "w-full"
                  } md:flex md:w-[360px] border-r h-full flex-col`}
                >
                  <ChatList onSelectChat={handleSelectChat} />
                </div>

                {/* Chat Box - Hidden on mobile if showing list, full width on mobile when in chat, flex on md+ */}
                <div
                  className={`${
                    showChatBox ? "w-full" : "hidden"
                  } md:flex md:flex-1 h-full flex-col w-full md:w-auto`}
                >
                  <ChatBox onBack={handleBackToList} />
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