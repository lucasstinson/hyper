import React, { useContext, useState } from "react";
import userWhite from "../../../assets/images/user-white.png";
import like from "../../../assets/images/heart-green.png";
import profileGreen from "../../../assets/images/profile-green.png";
import { getNotifications } from "../../../firebase/notifications";
import { UserContext } from "../../../UserContext";
import NotificationCard from "./NotificationCard";

const NotificationsList = () => {
  const { currentUser, setNotificationCount } = useContext(UserContext);

  const [notifications, setNotifications] = useState([]);

  const generateNotifications = async () => {
    try {
      const notifications = await getNotifications(currentUser.uid);
      let allNotifications = notifications.notifications.map((notification) => {
        <NotificationCard notification={notification} />;
      });
    } catch (error) {
      const errorMessage = error.message;
    }
  };

  useState(() => {
    if (currentUser) {
      const loadNotifications = async () => {
        try {
          const notifications = await getNotifications(currentUser.uid);
          setNotificationCount(notifications.count);
          console.log(notifications.notifications);
        } catch (error) {
          const errorMessage = error.message;
        }
      };
      loadNotifications();
    }
  }, []);

  return (
    <div className="notifications-list-container">
      <NotificationCard />
    </div>
  );
};

export default NotificationsList;
