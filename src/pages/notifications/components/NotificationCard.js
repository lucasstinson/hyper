import React, { useContext, useState } from "react";
import userWhite from "../../../assets/images/user-white.png";
import like from "../../../assets/images/heart-green.png";
import profileGreen from "../../../assets/images/profile-green.png";
import { getNotifications } from "../../../firebase/notifications";
import { UserContext } from "../../../UserContext";

const NotificationCard = () => {
  return (
    <div className="notification-container">
      <div className="notification-action-container">
        <img
          src={profileGreen}
          className="notification-emoji"
          alt="action-emoji"
        ></img>
      </div>
      <div className="notification-info-container">
        <img src={userWhite} className="notification-user" alt=""></img>
        <div className="notification-text">
          <span className="notification-username">user name</span> followed you
        </div>
        <div className="notification-shout"></div>
      </div>
    </div>
  );
};

export default NotificationCard;
