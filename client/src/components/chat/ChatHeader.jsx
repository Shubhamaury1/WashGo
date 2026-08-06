import { FaPhone, FaVideo, FaEllipsisV, FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

const ChatHeader = ({ user, onBack }) => {
  const onlineUsers = useSelector((state) => state.socket.onlineUsers);
  const isOnline = onlineUsers.includes(user?._id);


  
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

    const index = name.length % colors.length;

    return colors[index];
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
    <div className="h-14 md:h-16 bg-white border-b px-3 md:px-6 flex items-center justify-between shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden text-gray-600 hover:text-blue-600 transition flex-shrink-0"
          >
            <FaArrowLeft size={16} />
          </button>
        )}

        <div className="relative flex-shrink-0">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.fullName}
              className="w-10 md:w-12 h-10 md:h-12 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div
              className={`w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg border-2 border-gray-200 ${getAvatarColor(
                user?.fullName,
              )}`}
            >
              {getInitials(user?.fullName)}
            </div>
          )}

          {isOnline && (
            <div className="absolute bottom-0 right-0 w-2.5 md:w-3 h-2.5 md:h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-gray-800 text-sm md:text-base truncate">{user?.fullName}</h2>
          <p
            className={`text-xs font-medium ${
              isOnline ? "text-green-600" : "text-gray-400"
            }`}
          >
            {isOnline ? "🟢 Online" : "⚫ Offline"}
          </p>
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        <button className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-1.5 md:p-2 rounded-full transition">
          <FaPhone size={14} className="md:w-4 md:h-4" />
        </button>

        <button className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-1.5 md:p-2 rounded-full transition">
          <FaVideo size={14} className="md:w-4 md:h-4" />
        </button>

        <button className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-1.5 md:p-2 rounded-full transition">
          <FaEllipsisV size={14} className="md:w-4 md:h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
