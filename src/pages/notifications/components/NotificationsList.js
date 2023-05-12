import React, { useContext, useState } from "react";
import userWhite from "../../../assets/images/user-white.png";
import like from "../../../assets/images/heart-green.png";
import profileGreen from "../../../assets/images/profile-green.png";
import {
  getNotifications,
  getUserNotifications,
} from "../../../firebase/notifications";
import { UserContext } from "../../../UserContext";
import NotificationCard from "./NotificationCard";

const NotificationsList = () => {
  const { currentUser, setNotificationCount } = useContext(UserContext);

  const [notifications, setNotifications] = useState([]);

  const generateNotifications = async () => {
    try {
      const notifications = await getUserNotifications(currentUser.uid);
      let allNotifications = notifications.map((notification) => (
        <NotificationCard notification={notification} />
      ));
      setNotifications(allNotifications);
    } catch (error) {
      const errorMessage = error.message;
    }
  };

  useState(() => {
    generateNotifications();
  }, []);

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
