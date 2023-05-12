import React, { useContext, useState } from "react";
import userWhite from "../../../assets/images/user-white.png";
import like from "../../../assets/images/heart-green.png";
import reply from "../../../assets/images/reply-green.png";
import profileGreen from "../../../assets/images/profile-green.png";
import { getNotifications } from "../../../firebase/notifications";
import { UserContext } from "../../../UserContext";

const NotificationCard = (props) => {
  const { notification } = props;

  if (notification.type == "like") {
    return (
      <div className="notification-container">
        <div className="notification-action-container">
          <img
            src={like}
            className="notification-emoji"
            alt="action-emoji"
          ></img>
        </div>
        <div className="notification-info-container">
          <img
            src={notification.photoURL}
            className="notification-user"
            alt=""
          ></img>
          <div className="notification-text">
            <span className="notification-username">
              {notification.username}
            </span>{" "}
            liked your post
          </div>
          <div className="notification-shout"></div>
        </div>
      </div>
    );
  } else if (notification.type == "reply") {
    return (
      <div className="notification-container">
        <div className="notification-action-container">
          <img
            src={reply}
            className="notification-emoji"
            alt="action-emoji"
          ></img>
        </div>
        <div className="notification-info-container">
          <img
            src={notification.photoURL}
            className="notification-user"
            alt=""
          ></img>
          <div className="notification-text">
            <span className="notification-username">
              {notification.username}
            </span>{" "}
            replied to your post
          </div>
          <div className="notification-shout"></div>
        </div>
      </div>
    );
  } else if (notification.type == "follower") {
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
          <img
            src={notification.photoURL}
            className="notification-user"
            alt=""
          ></img>
          <div className="notification-text">
            <span className="notification-username">
              {notification.username}
            </span>{" "}
            followed you
          </div>
          <div className="notification-shout"></div>
        </div>
      </div>
    );
  }
};

export default NotificationCard;
