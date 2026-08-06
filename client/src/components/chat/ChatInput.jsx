import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaSmile, FaPaperclip } from "react-icons/fa";
import { useSocket } from "../../socket/SocketProvider";
import { useSelector } from "react-redux";

const ChatInput = ({ onSend }) => {
  const socket = useSocket();

  const [message, setMessage] = useState("");
  const typingTimeout = useRef(null);

  const { selectedChat } = useSelector((state) => state.chat);
  const currentUser = useSelector((state) => state.auth.user);

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message.trim());
    setMessage("");

    socket.emit("stop-typing", {
      chatId: selectedChat._id,
    });
  };

  const handleTyping = (value) => {
    setMessage(value);

    if (!selectedChat) return;

    socket.emit("typing", {
      chatId: selectedChat._id,
      sender: currentUser.fullName,
    });

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      socket.emit("stop-typing", {
        chatId: selectedChat._id,
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeout.current);
    };
  }, []);

  return (
    <div className="bg-white border-t px-2 md:px-4 py-2 md:py-3 shadow-lg">
      <div className="flex items-center gap-2 md:gap-3">
        {/* Emoji Button */}
        <button className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-1.5 md:p-2 rounded-full transition flex-shrink-0">
          <FaSmile size={16} className="md:w-5 md:h-5" />
        </button>

        {/* Attachment Button */}
        <button className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-1.5 md:p-2 rounded-full transition flex-shrink-0">
          <FaPaperclip size={14} className="md:w-4 md:h-4" />
        </button>

        {/* Message Input */}
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => handleTyping(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          className="flex-1 border border-gray-300 rounded-full px-3 md:px-4 py-1.5 md:py-2.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
            message.trim()
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <FaPaperPlane size={12} className="md:w-4 md:h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
