import { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";


function Notifications() {
  const user = useSelector((state) => state.auth.user);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id || user?._id) {
      loadNotifications();
    }
  }, [user]);

  const loadNotifications = async () => {
    try {
      const userId = user._id || user.id;

      const res = await notificationApi.getNotifications(userId);

      setNotifications(res.data.notifications);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    await notificationApi.markAsRead(id);

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
  };

  const deleteNotification = async (id) => {
    await notificationApi.deleteNotification(id);

    setNotifications((prev) => prev.filter((item) => item._id !== id));
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
        <div className="flex gap-6 p-6">
          <Sidebar />

          <main className="flex-1 ml-[294px]">
            <h1 className="text-4xl font-bold text-[#0d2240] mb-8">
              Notifications
            </h1>

            {loading ? (
              <div>Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow">
                <FaBell className="mx-auto mb-3 text-gray-400" size={50} />

                <h2 className="text-xl font-semibold">No Notifications</h2>

                <p className="text-gray-500 mt-2">You're all caught up.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((item) => (
                  <div
                    key={item._id}
                    className={`bg-white rounded-xl shadow p-5 flex justify-between transition hover:shadow-lg ${
                      !item.isRead ? "border-l-4 border-blue-600" : ""
                    }`}
                  >
                    <div
                      className="flex gap-4 cursor-pointer flex-1"
                      onClick={() => markRead(item._id)}
                    >
                      {icon(item.type)}

                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>

                        <p className="text-gray-600 mt-1">{item.message}</p>

                        {item.couponCode && (
                          <div className="mt-2">
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                              Coupon : {item.couponCode}
                            </span>
                          </div>
                        )}

                        {item.redeemCode && (
                          <div className="mt-2">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                              Redeem : {item.redeemCode}
                            </span>
                          </div>
                        )}

                       
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {!item.isRead && (
                        <FaCheckCircle className="text-blue-600" size={22} />
                      )}

                      <FaTrash
                        size={22}
                        className="cursor-pointer text-red-500 hover:text-red-700"
                        onClick={() => deleteNotification(item._id)}
                      />
                    </div>
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