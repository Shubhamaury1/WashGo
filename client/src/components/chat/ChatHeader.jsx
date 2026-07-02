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
    <div className="h-16 bg-white border-b px-6 flex items-center justify-between shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden text-gray-600 hover:text-blue-600 transition"
          >
            <FaArrowLeft size={18} />
          </button>
        )}

        <div className="relative">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.fullName}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-gray-200 ${getAvatarColor(
                user?.fullName,
              )}`}
            >
              {getInitials(user?.fullName)}
            </div>
          )}

          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-gray-800">{user?.fullName}</h2>
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
      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-full transition">
          <FaPhone size={16} />
        </button>

        <button className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-full transition">
          <FaVideo size={18} />
        </button>

        <button className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-full transition">
          <FaEllipsisV size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
