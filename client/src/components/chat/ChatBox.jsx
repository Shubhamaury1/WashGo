import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import chatApi from "../../api/chatApi";
import { addMessage, setMessages } from "../../redux/chatSlice";
import { useSocket } from "../../socket/SocketProvider";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

const ChatBox = () => {
  const dispatch = useDispatch();
  const socket = useSocket();

  const bottomRef = useRef(null);

  const { selectedChat, messages } = useSelector((state) => state.chat);

  const currentUser = useSelector((state) => state.auth.user);

  const loadMessages = async () => {
    try {
      const res = await chatApi.getMessages(selectedChat._id);
      dispatch(setMessages(res.data));
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  };

  useEffect(() => {
    if (!selectedChat) return;

    loadMessages();

    socket.emit("join-chat", selectedChat._id);

    console.log("Joined Chat:", selectedChat._id);
  }, [selectedChat, socket, dispatch]);

  useEffect(() => {
    const receiveMessage = (message) => {
      if (message.chat === selectedChat?._id) {
        dispatch(addMessage(message));
      }
    };

    socket.on("receive-message", receiveMessage);

    return () => {
      socket.off("receive-message", receiveMessage);
    };
  }, [selectedChat, dispatch, socket]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async (text) => {
    try {
      await chatApi.sendMessage({
        chatId: selectedChat._id,
        sender: currentUser.id,
        text,
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center px-6">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome to WashGo Chat</h2>
          <p className="text-gray-500 mt-2">
            Select a conversation to start messaging
          </p>
        </div>
      </div>
    );
  }

  let otherUser;

  if (selectedChat.customer?._id !== currentUser.id) {
    otherUser = selectedChat.customer;
  } else if (selectedChat.currentSupport === "admin") {
    otherUser = selectedChat.admin;
  } else {
    otherUser = selectedChat.washer;
  }

  return (
  
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <ChatHeader user={otherUser} />

      {/* Messages */}
      {/* <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-gray-50 p-4 space-y-4"> */}
      <div
        className="
        flex-1
        overflow-y-auto
        px-5
        py-4
        bg-[#f8fafc]
        space-y-3
    "
      >
        {messages.length === 0 ? (
          <div className="flex justify-center mt-10">
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm text-gray-500 text-center">
              <p className="text-sm">No messages yet</p>
              <p className="text-xs text-gray-400 mt-1">Start a conversation</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message._id}
                message={message}
                currentUser={currentUser.id}
              />
            ))}
          </>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} />
     
    </div>
  );
};

export default ChatBox;
