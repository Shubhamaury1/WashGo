import { useSelector } from "react-redux";

const OnlineStatus = ({ userId }) => {
  const onlineUsers = useSelector((state) => state.socket.onlineUsers);

  const online = onlineUsers.includes(userId);

  return (
    <span
      className={`text-xs font-medium

      ${online ? "text-green-500" : "text-gray-400"}`}
    >
      ● {online ? "Online" : "Offline"}
    </span>
  );
};

export default OnlineStatus;
