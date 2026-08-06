import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import chatApi from "../../api/chatApi";
import notificationApi from "../../api/notificationApi";
import { addMessage, setMessages } from "../../redux/chatSlice";
import { addNotification, markChatAsRead } from "../../redux/notificationSlice";
import { useSocket } from "../../socket/SocketProvider";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

const ChatBox = ({ onBack }) => {
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

  const getOfflineQueue = (chatId) => {
    try {
      const queue = localStorage.getItem(`chat_queue_${chatId}`);
      return queue ? JSON.parse(queue) : [];
    } catch (err) {
      console.error("Failed to get offline queue:", err);
      return [];
    }
  };

  const saveToOfflineQueue = (chatId, message) => {
    try {
      const queue = getOfflineQueue(chatId);
      queue.push({ ...message, pendingId: Date.now() });
      localStorage.setItem(`chat_queue_${chatId}`, JSON.stringify(queue));
    } catch (err) {
      console.error("Failed to save to offline queue:", err);
    }
  };

  const clearOfflineQueue = (chatId) => {
    try {
      localStorage.removeItem(`chat_queue_${chatId}`);
    } catch (err) {
      console.error("Failed to clear offline queue:", err);
    }
  };

  const syncOfflineMessages = async (chatId) => {
    const queue = getOfflineQueue(chatId);
    if (queue.length === 0) return;

    for (const message of queue) {
      try {
        await chatApi.sendMessage({
          chatId,
          sender: currentUser.id,
          text: message.text,
        });
      } catch (err) {
        console.error("Failed to sync offline message:", err);
        return;
      }
    }
    clearOfflineQueue(chatId);
  };

  useEffect(() => {
    if (!selectedChat) return;

    loadMessages();
    
    // Mark chat as read when opened - update DB and Redux
    dispatch(markChatAsRead(selectedChat._id));
    
    // Call API to mark all notifications for this chat as read in database
    notificationApi.markChatAsRead(currentUser.id, selectedChat._id).catch(err => {
      console.error("Failed to mark chat as read in DB:", err);
    });

    socket.emit("join-chat", selectedChat._id);

    // Sync offline messages when chat is selected and connection is available
    syncOfflineMessages(selectedChat._id);

    console.log("Joined Chat:", selectedChat._id);
  }, [selectedChat, socket, dispatch, currentUser.id]);

  useEffect(() => {
    const receiveMessage = async (message) => {
      // Check if message belongs to current chat
      if (message.chat === selectedChat?._id) {
        // Add to messages and mark as read since we're viewing it
        dispatch(addMessage(message));
      } else {
        // Message is for a different chat - create notification and increment unread
        const notificationData = {
          _id: message._id,
          chatId: message.chat,
          chat: message.chat,
          sender: message.sender,
          text: message.text,
          isRead: false,
          timestamp: new Date(),
        };
        
        dispatch(addNotification(notificationData));
        
        // Save to database
        try {
          const senderId = typeof message.sender === "object" 
            ? message.sender._id 
            : message.sender;
          
          await notificationApi.createNotification({
            recipient: currentUser.id,
            chat: message.chat,
            sender: senderId,
            text: message.text,
            type: 'message'
          });
        } catch (err) {
          console.error("Failed to save notification:", err);
        }
      }
    };

    socket.on("receive-message", receiveMessage);

    return () => {
      socket.off("receive-message", receiveMessage);
    };
  }, [selectedChat, dispatch, socket, currentUser.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async (text) => {
    try {
      const isOnline = navigator.onLine;
      const pendingId = `pending_${Date.now()}`;

      // Show message immediately (optimistic update)
      const localMessage = {
        _id: pendingId,
        text,
        sender: currentUser.id,
        chat: selectedChat._id,
        createdAt: new Date(),
        pending: true,
      };
      dispatch(addMessage(localMessage));

      if (!isOnline) {
        // Save to offline queue if offline
        saveToOfflineQueue(selectedChat._id, {
          text,
          sender: currentUser.id,
          timestamp: new Date(),
        });
        return;
      }

      // Send to server
      await chatApi.sendMessage({
        chatId: selectedChat._id,
        sender: currentUser.id,
        text,
      });

      // Reload messages from DB to ensure we have the latest with correct IDs
      // This handles both cases: socket event received or not
      setTimeout(() => {
        loadMessages();
      }, 500); // Small delay to let server process
    } catch (err) {
      console.error("Failed to send message:", err);
      // Save to offline queue on error
      saveToOfflineQueue(selectedChat._id, {
        text,
        sender: currentUser.id,
        timestamp: new Date(),
      });
      // Keep the pending message visible - it will sync when online
    }
  };

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      if (selectedChat) {
        syncOfflineMessages(selectedChat._id);
      }
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [selectedChat]);

  // Listen for socket reconnection to reload messages
  useEffect(() => {
    const handleReconnect = () => {
      if (selectedChat) {
        console.log("Socket reconnected, reloading messages...");
        loadMessages();
        socket.emit("join-chat", selectedChat._id);
      }
    };

    socket.on("connect", handleReconnect);
    return () => socket.off("connect", handleReconnect);
  }, [selectedChat, socket]);

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
      <ChatHeader user={otherUser} onBack={onBack} />

      {/* Messages */}
      <div
        className="
        flex-1
        overflow-y-auto
        px-2 md:px-5
        py-3 md:py-4
        bg-[#f8fafc]
        space-y-2 md:space-y-3
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
