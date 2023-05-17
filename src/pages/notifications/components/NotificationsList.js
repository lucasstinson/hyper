import React, { useContext, useState } from "react";
import userWhite from "../../../assets/images/user-white.png";
import like from "../../../assets/images/heart-green.png";
import profileGreen from "../../../assets/images/profile-green.png";
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
      setNotificationCount(0);
      setTimeout(() => {
        updateRead(currentUser.uid);
      }, [3000]);
    }
  }, [notifications]);

  useState(() => {
    if (currentUser) {
      const loadNotifications = async () => {
        try {
          const { notifications, count } = await getNotifications(
            currentUser.uid
          );
          setNotificationCount(count);
        } catch (error) {
          const errorMessage = error.message;
        }
      };
      loadNotifications();
    }
  }, []);

  return <div className="notifications-list-container">{notifications}</div>;
};

export default NotificationsList;
