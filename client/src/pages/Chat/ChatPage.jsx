import ChatList from "../../components/chat/ChatList";
import ChatBox from "../../components/chat/ChatBox";
import MainLayout from "../../layouts/MainLayout";

const ChatPage = () => {
  return (
    <MainLayout>
      <div className="h-[calc(100vh-90px)] bg-gray-100">
        <div className="max-w-7xl mx-auto h-full">
          <div className="flex h-full bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Left Side */}
            <ChatList />

            {/* Right Side */}
            <ChatBox />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatPage;
