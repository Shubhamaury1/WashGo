import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import notificationApi from "./api/notificationApi";
import { setUnreadCount, setUnreadByChat } from "./redux/notificationSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Load unread notifications when app starts
  useEffect(() => {
    if (!user?.id) return;

    const loadUnreadNotifications = async () => {
      try {
        // Load notifications only (not old ones)
        const notificationsRes = await notificationApi.getNotifications(user.id);
        const notifications = notificationsRes.data.notifications || [];

        // Count unread by chat - only count unread notifications
        const unreadByChat = {};
        let totalUnread = 0;
        
        notifications.forEach((notif) => {
          if (!notif.isRead) {
            const chatId = notif.chat || notif.chatId;
            if (chatId) {
              unreadByChat[chatId] = (unreadByChat[chatId] || 0) + 1;
              totalUnread += 1;
            }
          }
        });
        
        dispatch(setUnreadCount(totalUnread));
        dispatch(setUnreadByChat(unreadByChat));
      } catch (err) {
        console.error("Failed to load unread notifications:", err);
      }
    };

    loadUnreadNotifications();
  }, [user?.id, dispatch]);

  return (
    <>
      <AppRoutes />
      {/* <Footer /> */}
    </>
  );
}

export default App;
