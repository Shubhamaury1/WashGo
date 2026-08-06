import { useEffect, useState, useContext } from "react";
import {
  FaBell,
  FaTrash,
  FaCheckCircle,
  FaTicketAlt,
  FaCreditCard,
  FaCalendarAlt,
} from "react-icons/fa";
import MainLayout from "../../layouts/MainLayout";
import Sidebar from "../../components/dashboard/Sidebar";
import notificationApi from "../../api/notificationApi";
import { useSelector, useDispatch } from "react-redux";
import { markRead, setNotifications as setReduxNotifications } from "../../redux/notificationSlice";
import { useSocket } from "../../socket/SocketProvider";


function Notifications() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const socket = useSocket();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id || user?._id) {
      loadNotifications();
    }
  }, [user]);

  // Listen to real-time notifications via Socket.io
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      dispatch(setReduxNotifications([notification, ...notifications]));
    };

    socket.on("new-notification", handleNewNotification);

    return () => {
      socket.off("new-notification", handleNewNotification);
    };
  }, [socket, notifications, dispatch]);

  const loadNotifications = async () => {
    try {
      const userId = user._id || user.id;

      const res = await notificationApi.getNotifications(userId);

      setNotifications(res.data.notifications);
      // Also update Redux state so notification bell updates
      dispatch(setReduxNotifications(res.data.notifications));

      // Mark all offer notifications as read when page loads
      await notificationApi.markOfferNotificationsAsRead(userId);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await notificationApi.markRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                isRead: true,
              }
            : item,
        ),
      );

      // Also update Redux state so notification bell count updates
      dispatch(markRead(id));
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  // Filter out chat notifications - only show offers, coupons, payments, etc
  const filteredNotifications = notifications.filter(
    (notif) => notif.type !== "chat" && !notif.chat
  );

  const deleteNotification = async (id) => {
    try {
      await notificationApi.deleteNotification(id);

      setNotifications((prev) => prev.filter((item) => item._id !== id));
      // Also update Redux
      dispatch(markRead(id)); // This will decrement unread count
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const icon = (type) => {
    switch (type) {
      case "booking":
        return <FaCalendarAlt className="text-blue-500" size={24} />;

      case "payment":
        return <FaCreditCard className="text-green-500" size={24} />;

      case "coupon":
        return <FaTicketAlt className="text-orange-500" size={24} />;

      default:
        return <FaBell className="text-indigo-500" size={24} />;
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#f5f7fb] min-h-screen">
        <div className="flex gap-4 md:gap-6 p-4 md:p-6">
          <Sidebar />

          <main className="flex-1 md:ml-[294px] w-full md:w-auto">
            {/* <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0d2240] mb-4 md:mb-8">
              Notifications
            </h1> */}
             <h1 className="px-12 sm:px-12 lg:px-0 py-6 sm:py-6 lg:py-0 text-2xl sm:text-3xl md:text-4xl font-bold text-[#0d2240] mb-4 md:mb-8">
              Notifications
            </h1>
           

            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : filteredNotifications.length === 0 ? (
              <div className="bg-white rounded-2xl md:rounded-xl p-8 md:p-12 text-center shadow">
                <FaBell className="mx-auto mb-3 text-gray-400" size={40} />

                <h2 className="text-lg md:text-xl font-semibold">No Notifications</h2>

                <p className="text-sm md:text-base text-gray-500 mt-2">You're all caught up.</p>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {filteredNotifications.map((item) => (
                  <div
                    key={item._id}
                    className={`bg-white rounded-lg md:rounded-xl shadow p-3 md:p-5 transition hover:shadow-lg cursor-pointer ${
                      !item.isRead ? "border-l-4 border-blue-600" : ""
                    }`}
                    onClick={() => markAsRead(item._id)}
                  >
                    {/* Top Section: Icon and Title with Delete Button */}
                    <div className="flex gap-3 md:gap-4 items-start justify-between mb-2">
                      <div className="flex gap-3 md:gap-4 flex-1 min-w-0">
                        <div className="flex-shrink-0 text-base md:text-lg pt-1">
                          {icon(item.type)}
                        </div>
                        <h3 className="font-semibold text-base md:text-lg line-clamp-2 break-words">{item.title}</h3>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(item._id);
                        }}
                        className="text-red-500 hover:text-red-700 transition flex-shrink-0 p-1"
                        title="Delete notification"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>

                    {/* Message */}
                    <div className="ml-9 md:ml-11">
                      <p className="text-xs md:text-base text-gray-600 line-clamp-2">{item.message}</p>

                      {/* Coupon and Redeem Codes */}
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.couponCode && (
                          <span className="inline-block bg-green-100 text-green-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                            Coupon : {item.couponCode}
                          </span>
                        )}

                        {item.redeemCode && (
                          <span className="inline-block bg-blue-100 text-blue-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                            Redeem : {item.redeemCode}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Read Status Indicator */}
                    {!item.isRead && (
                      <div className="mt-2 ml-9 md:ml-11">
                        <div className="flex items-center gap-2">
                          <FaCheckCircle className="text-blue-600" size={14} />
                          <span className="text-xs text-blue-600">Mark as read</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </MainLayout>
  );
}

export default Notifications;