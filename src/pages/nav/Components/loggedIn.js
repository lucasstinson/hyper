import React from "react";
import homeFeedWhite from "../../../assets/images/home-white.png";
import homeFeedGreen from "../../../assets/images/home-green.png";
import notificationsWhite from "../../../assets/images/notifications-white.png";
import notificationsGreen from "../../../assets/images/notifications-green.png";
import messagesGreen from "../../../assets/images/mail-green.png";
import messagesWhite from "../../../assets/images/mail-white.png";
import userWhite from "../../../assets/images/user-white.png";
import userGreen from "../../../assets/images/user-white.png";

const LoggedIn = () => {
  return (
    <div className="directory-container">
      <div className="directory-profile-container">
        <img src={userWhite} className="user-logo" alt="user logo"></img>
      </div>
      <div className="directory-feed-container">
        <img src={homeFeedWhite} className="feed-logo" alt="feed logo"></img>
      </div>
      <div className="directory-notifications-container">
        <img
          src={notificationsWhite}
          className="notifications-logo"
          alt="notification logo"
        ></img>
        <div className="notifcations-sticker"></div>
      </div>
      <div className="directory-messages-container">
        <img
          src={messagesWhite}
          className="messages-logo"
          alt="messages logo"
        ></img>
        <div className="messages-sticker"></div>
      </div>
    </div>
  );
};

export default LoggedIn;
