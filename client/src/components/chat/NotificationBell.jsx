import { FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";

const NotificationBell = () => {
  const unread = useSelector((state) => state.notification.unreadCount);

  return (
    <div className="relative cursor-pointer">
      <FaBell size={22} />

      {unread > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
          {unread}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
