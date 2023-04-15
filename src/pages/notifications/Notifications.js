import React from "react";
import "./notifications.css";
import userWhite from "../../assets/images/user-white.png";
import like from "../../assets/images/heart-green.png";

const Notifications = () => {
  return (
    <div className="Notifications">
      <div className="notifications-container">
        <div className="notifications-title-container">
          <div className="notifications-title">Notifications</div>
        </div>
        <div className="notifications-list-container">
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
                src={userWhite}
                className="notification-user"
                alt="user pic"
              ></img>
              <div className="notification-text">user name followed you</div>
              <div className="notification-shout"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

// the top of the page under the nave bar should show notifications underlined and centered
// underneath that should be all the notifications,
// either white background or a gray background(unread)
// should be linkable to the tweets that were liked

// notification will have an emoji for the action
// heart for like, user icon for follow,
// the profile image of whoever performed that action
// note or comment related to that action, "Luke" followed you
// if retweeted...then will also show the tweet
// the links will be clickable
// like will link to post liked
// retweet will link to the post retweeted
// follow will link to your followers page you can also click the persons name
