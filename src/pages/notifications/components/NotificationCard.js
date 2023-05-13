import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import userWhite from "../../../assets/images/user-white.png";
import like from "../../../assets/images/heart-green.png";
import reply from "../../../assets/images/reply-green.png";
import profileGreen from "../../../assets/images/profile-green.png";
import { getNotifications } from "../../../firebase/notifications";
import { UserContext } from "../../../UserContext";

const NotificationCard = (props) => {
  const { notification, userID } = props;

  if (notification.type == "like") {
    return (
      <Link
        to={`/post/${notification.id}`}
        state={{ uid: userID }}
        className="post-link"
        key={notification.timestampExtended}
      >
        <div className="notification-container">
          <div className="notification-action-container">
            <img
              src={like}
              className="notification-emoji"
              alt="action-emoji"
            ></img>
          </div>
          <div className="notification-info-container">
            <Link
              to={`/profile/${notification.uniqueID}`}
              className="profile-link"
            >
              <img
                src={notification.photoURL}
                className="notification-user"
                alt=""
              ></img>
            </Link>
            <div className="notification-text">
              <Link
                to={`/profile/${notification.uniqueID}`}
                className="profile-link"
              >
                <span className="notification-username">
                  {notification.username}
                </span>{" "}
              </Link>
              liked your post
            </div>
            <div className="notification-shout"></div>
          </div>
        </div>
      </Link>
    );
  } else if (notification.type == "reply") {
    return (
      <Link
        to={`/post/${notification.id}`}
        state={{ uid: userID }}
        className="post-link"
      >
        <div className="notification-container">
          <div className="notification-action-container">
            <img
              src={reply}
              className="notification-emoji"
              alt="action-emoji"
            ></img>
          </div>
          <div className="notification-info-container">
            <Link
              to={`/profile/${notification.uniqueID}`}
              className="profile-link"
            >
              <img
                src={notification.photoURL}
                className="notification-user"
                alt=""
              ></img>
            </Link>
            <div className="notification-text">
              <Link
                to={`/profile/${notification.uniqueID}`}
                className="profile-link"
              >
                <span className="notification-username">
                  {notification.username}
                </span>
              </Link>{" "}
              replied to your post
            </div>
            <div className="notification-shout"></div>
          </div>
        </div>
      </Link>
    );
  } else if (notification.type == "follower") {
    return (
      <Link to={`/profile/${notification.uniqueID}`} className="post-link">
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
      </Link>
    );
  }
};

export default NotificationCard;
