import moment from "moment";
import { FaCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const ChatItem = ({ chat, currentUser, selected, onClick }) => {
  const onlineUsers = useSelector((state) => state.socket.onlineUsers);
  const unreadByChat = useSelector((state) => state.notification.unreadByChat);

  let otherUser;

  if (chat.customer?._id !== currentUser.id) {
    otherUser = chat.customer;
  } else if (chat.currentSupport === "admin") {
    otherUser = chat.admin;
  } else {
    otherUser = chat.washer;
  }

  const isOnline = onlineUsers.includes(otherUser?._id);
  const unreadCount = unreadByChat[chat._id] || 0;

  const getAvatarColor = (name = "") => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-orange-500",
      "bg-indigo-500",
      "bg-cyan-500",
    ];

    return colors[name.length % colors.length];
  };

  const getInitials = (name = "") => {
    if (!name) return "?";

    const words = name.trim().split(" ");

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 md:py-3 cursor-pointer transition-all duration-200 border-b
      ${
        selected
          ? "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-l-blue-600"
          : "hover:bg-gray-50 bg-white"
      }`}
    >
      {/* Avatar with Online Status */}
      <div className="relative flex-shrink-0">
        {otherUser?.profileImage ? (
          <img
            src={otherUser.profileImage}
            alt={otherUser.fullName}
            className={`w-10 md:w-12 h-10 md:h-12 rounded-full object-cover ${
              selected ? "ring-2 ring-blue-500" : "ring-1 ring-gray-200"
            }`}
          />
        ) : (
          <div
            className={`w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg ${getAvatarColor(
              otherUser?.fullName,
            )} ${selected ? "ring-2 ring-blue-500" : "ring-1 ring-gray-200"}`}
          >
            {getInitials(otherUser?.fullName)}
          </div>
        )}

        {isOnline && (
          <div className="absolute bottom-0 right-0 w-2.5 md:w-3 h-2.5 md:h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-gray-800 truncate text-sm md:text-base">
            {otherUser?.fullName}
          </h3>
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0 ml-2">
            {chat.lastMessage && (
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {moment(chat.lastMessage.createdAt).format("hh:mm A")}
              </span>
            )}
            {unreadCount > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
        </div>

        <p className="text-xs md:text-sm text-gray-600 truncate mt-1">
          {chat.lastMessage ? chat.lastMessage.text : "Start chatting..."}
        </p>
      </div>

      {/* Online Indicator */}
      {isOnline && (
        <div className="flex-shrink-0 hidden md:block">
          <FaCircle size={6} className="text-green-500" />
        </div>
      )}
    </div>
  );
};

export default ChatItem;
