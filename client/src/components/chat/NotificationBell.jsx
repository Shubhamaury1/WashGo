import { FaBell } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { markRead } from "../../redux/notificationSlice";

const NotificationBell = () => {
  const dispatch = useDispatch();
  const unread = useSelector((state) => state.notification.unreadCount);
  const notifications = useSelector((state) => state.notification.notifications);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markRead(notificationId));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-gray-600 hover:text-blue-600 transition-colors relative p-2 hover:bg-gray-100 rounded-full"
      >
        <FaBell size={22} />

        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-pulse">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">Notifications</h3>
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  <p className="text-sm text-gray-700 font-medium">
                    {notification.sender?.fullName || "User"}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {notification.text}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
