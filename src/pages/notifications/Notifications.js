import React from "react";
import "./notifications.css";
import NotificationsList from "./components/NotificationsList";

const Notifications = () => {
  return (
    <div className="Notifications">
      <div className="notifications-container">
        <div className="notifications-title-container">
          <div className="notifications-title">Notifications</div>
        </div>
        <NotificationsList />
      </div>
    </div>
  );
};

export default Notifications;
