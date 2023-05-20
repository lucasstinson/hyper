import React, { useContext, useState } from "react";
import {
  getNotifications,
  getUserNotifications,
  updateRead,
} from "../../../firebase/notifications";
import { UserContext } from "../../../UserContext";
import NotificationCard from "./NotificationCard";

const NotificationsList = () => {
  // context hook to current logged in user info.
  const { currentUser, setNotificationCount } = useContext(UserContext);

  // initial notifications variable
  const [notifications, setNotifications] = useState([]);

  // gets all notifications for current user, orders them by time
  // and maps them to the notifications variable
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

  // upon seeing a notifications change, generate the notifications and
  // update the count of unseen notification to 0 after a .5 sec delay
  useState(() => {
    generateNotifications();
    if (currentUser) {
      updateRead(currentUser.uid);
      setTimeout(() => {
        setNotificationCount(0);
      }, [500]);
    }
  }, [notifications]);

  // on mount, update the notification count after 5 sec delay
  // this makes sure the current count is in line with firebase
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
