import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaSpinner, FaSyncAlt } from "react-icons/fa";
import chatApi from "../../api/chatApi";
import { setChats, setSelectedChat } from "../../redux/chatSlice";
import ChatItem from "./ChatItem";

const ChatList = () => {
  const dispatch = useDispatch();
  const { chats, selectedChat } = useSelector((state) => state.chat);
  const user = useSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const loadChats = async () => {
    try {
      setLoading(true);
      console.log("Loading chats for user:", user.id);
      const res = await chatApi.getChats(user.id);
      console.log("Chats loaded:", res.data.chats);
      dispatch(setChats(res.data.chats));
    } catch (err) {
      console.error("Failed to load chats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadChats();
    }
  }, [user?.id]);

  // Deduplicate chats by user (keep latest for same user)
  const uniqueChatsMap = new Map();
  chats.forEach((chat) => {
    // Determine the other user
    let otherUserId;
    if (chat.customer?._id !== user.id) {
      otherUserId = chat.customer?._id;
    } else if (chat.currentSupport === "admin") {
      otherUserId = chat.admin?._id;
    } else {
      otherUserId = chat.washer?._id;
    }

    const key = otherUserId?.toString() || chat._id;
    
    // Keep the latest chat for same user
    if (!uniqueChatsMap.has(key) || new Date(chat.updatedAt) > new Date(uniqueChatsMap.get(key).updatedAt)) {
      uniqueChatsMap.set(key, chat);
    }
  });
  const uniqueChats = Array.from(uniqueChatsMap.values());

  const filteredChats = uniqueChats.filter((chat) => {
    let otherUser;
    if (chat.customer?._id !== user.id) {
      otherUser = chat.customer;
    } else if (chat.currentSupport === "admin") {
      otherUser = chat.admin;
    } else {
      otherUser = chat.washer;
    }
    return otherUser?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
     
      <div className="flex-shrink-0 p-4 border-b bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Chats</h2>
          <button
            onClick={loadChats}
            disabled={loading}
            className="p-2 hover:bg-blue-200 rounded-full transition"
            title="Refresh chats"
          >
            <FaSyncAlt
              className={`text-gray-600 ${loading ? "animate-spin" : ""}`}
            />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {loading && chats.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <FaSpinner className="animate-spin text-blue-600 text-3xl" />
          </div>
        ) : filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-gray-500 font-medium">
              {chats.length === 0 ? "No Chats Yet" : "No Chats Found"}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {chats.length === 0
                ? "Start a conversation after booking"
                : "Try a different search"}
            </p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <ChatItem
              key={chat._id}
              chat={chat}
              currentUser={user}
              selected={selectedChat?._id === chat._id}
              onClick={() => {
                dispatch(setSelectedChat(chat));
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
