import React, { useContext, useState } from "react";
import {
  getNotifications,
  getUserNotifications,
  updateRead,
} from "../../../firebase/notifications";
import { UserContext } from "../../../UserContext";
import NotificationCard from "./NotificationCard";

const NotificationsList = () => {
  const { currentUser, setNotificationCount } = useContext(UserContext);

  const [notifications, setNotifications] = useState([]);

  const generateNotifications = async () => {
    try {
      const notifications = await getUserNotifications(currentUser.uid);
      notifications.sort((a, b) => {
        let aTime = a.timestampExtended;
        let bTime = b.timestampExtended;
        if (aTime < bTime) return 1;
        if (aTime > bTime) return -1;
        return 0;
      });
      let allNotifications = notifications.map((notification) => (
        <NotificationCard
          notification={notification}
          userID={currentUser.uid}
          key={notification.timestampExtended}
        />
      ));
      setNotifications(allNotifications);
    } catch (error) {
      const errorMessage = error.message;
    }
  };

  useState(() => {
    generateNotifications();
    if (currentUser) {
      updateRead(currentUser.uid);
      setTimeout(() => {
        setNotificationCount(0);
      }, [500]);
    }
  }, [notifications]);

  useState(() => {
    setTimeout(() => {
      const loadNotifications = async () => {
        try {
          const notifications = await getNotifications(currentUser.uid);
          setNotificationCount(notifications.count);
        } catch (error) {
          const errorMessage = error.message;
        }
      };
      loadNotifications();
    }, [5000]);
  }, []);

  return <div className="notifications-list-container">{notifications}</div>;
};

export default NotificationsList;
