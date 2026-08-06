import moment from "moment";
import { FaCheck, FaCheckDouble, FaClock } from "react-icons/fa";

const MessageBubble = ({ message, currentUser }) => {
  // Handle both formats: sender as string ID or as object with _id
  let senderId;
  if (typeof message.sender === "object" && message.sender) {
    senderId = message.sender._id || message.sender.id;
  } else {
    senderId = message.sender;
  }

  const isOwnMessage = senderId === currentUser;
  const isPending = message.pending === true;

  return (
    <div
      className={`flex mb-1 md:mb-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs md:lg:max-w-md px-3 md:px-4 py-2 md:py-3 rounded-2xl shadow-sm break-words transition-all text-xs md:text-sm ${
          isOwnMessage
            ? `${
                isPending
                  ? "bg-blue-400 text-white rounded-br-none opacity-75"
                  : "bg-blue-600 text-white rounded-br-none"
              }`
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        }`}
      >
        {/* Message */}
        <p className="leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>

        {/* Footer - Time & Status */}
        <div className="flex justify-end items-center gap-1 mt-1">
          <span
            className={`text-xs font-medium ${
              isOwnMessage ? "text-blue-100" : "text-gray-500"
            }`}
          >
            {moment(message.createdAt).format("hh:mm")}
          </span>

          {isOwnMessage && (
            <>
              {isPending ? (
                <FaClock size={8} className="text-yellow-200 animate-pulse" />
              ) : message.seen ? (
                <FaCheckDouble size={9} className="text-cyan-300" />
              ) : (
                <FaCheck size={8} className="text-blue-200" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
