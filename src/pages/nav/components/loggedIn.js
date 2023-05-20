import React, { useContext, useEffect, useState } from "react";
import homeFeedWhite from "../../../assets/images/home-white.png";
import homeFeedGreen from "../../../assets/images/home-green.png";
import notificationsWhite from "../../../assets/images/notifications-white.png";
import notificationsGreen from "../../../assets/images/notifications-green.png";
import messagesGreen from "../../../assets/images/mail-green.png";
import messagesWhite from "../../../assets/images/mail-white.png";
import userWhite from "../../../assets/images/user-white.png";
import postWhite from "../../../assets/images/post-white.png";
import postGreen from "../../../assets/images/post-green.png";
import { Link, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import Post from "../../post/Post";
import { UserContext } from "../../../UserContext";

const LoggedIn = () => {
  // context hook to current logged in user info.
  const { photoURL, currentUser, notificationCount, messageCount } =
    useContext(UserContext);

  // Initial flag on whether to show a post modal
  const [showPost, setShowPost] = useState(false);

  // grabs the current URL
  const location = useLocation();

  // Initial url variable
  const [url, setUrl] = useState(null);

  // Initial user id set to current logged in user id.
  const userID = currentUser.uid;

  // Initial visibility on notification count
  const [notificationVisibility, setNotificaitonVisibility] =
    useState("hidden");

  // Initial visibility on message count

  const [messageVisibility, setMessageVisibility] = useState("hidden");

  // checks to see if there are unseen notifications. > 0 notifies user.
  const notificationCheck = () => {
    if (notificationCount > 0) {
      setNotificaitonVisibility("visible");
    } else {
      setNotificaitonVisibility("hidden");
    }
  };

  // checks to see if there are unseen messages. > 0 notifies user.
  const messageCheck = () => {
    if (messageCount > 0) {
      setMessageVisibility("visible");
    } else {
      setMessageVisibility("hidden");
    }
  };

  // sets URL if location changes
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  // runs each time the unseen notification count updates
  useEffect(() => {
    notificationCheck();
  }, [notificationCount]);

  // runs each time the unseen message count updates
  useEffect(() => {
    messageCheck();
  }, [messageCount]);

  // renders the navigation bar and adds an underline to the current
  // tab location based on the path name
  return (
    <div className="directory-container">
      <div className="directory-profile-container">
        <Link
          to={`/profile/${userID}`}
          className={
            "nav-underline" + (url === `/profile/${userID}` ? " active" : "")
          }
        >
          <img
            src={photoURL}
            className="user-logo"
            alt=""
            onMouseOver={(e) => (e.currentTarget.style.borderColor = "#86c323")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#222629")
            }
          ></img>
        </Link>
      </div>
      <div className="directory-feed-container">
        <Link
          to={"/"}
          className={"nav-underline" + (url === "/" ? " active" : "")}
        >
          <img
            src={homeFeedWhite}
            className="feed-logo"
            alt="feed logo"
            onMouseOver={(e) => (e.currentTarget.src = homeFeedGreen)}
            onMouseLeave={(e) => (e.currentTarget.src = homeFeedWhite)}
          ></img>
        </Link>
      </div>
      <div className="directory-post-container">
        <img
          src={postWhite}
          className="post-logo"
          alt="post logo"
          onClick={() => setShowPost(true)}
          onMouseOver={(e) => (e.currentTarget.src = postGreen)}
          onMouseLeave={(e) => (e.currentTarget.src = postWhite)}
        ></img>
        {showPost &&
          createPortal(
            <Post onClose={() => setShowPost(false)} />,
            document.querySelector(".App")
          )}
      </div>
      <div className="directory-notifications-container">
        <Link
          to={"/notifications"}
          className={
            "nav-underline" + (url === "/notifications" ? " active" : "")
          }
        >
          <img
            src={notificationsWhite}
            className="notifications-logo"
            alt="notification logo"
            onMouseOver={(e) => (e.currentTarget.src = notificationsGreen)}
            onMouseLeave={(e) => (e.currentTarget.src = notificationsWhite)}
          ></img>
          <div
            className="notification-sticker"
            style={{ visibility: notificationVisibility }}
          >
            {notificationCount}
          </div>
        </Link>
        <div className="notifcations-sticker"></div>
      </div>
      <div className="directory-messages-container">
        <Link
          to={"/messages"}
          className={"nav-underline" + (url === "/messages" ? " active" : "")}
        >
          <img
            src={messagesWhite}
            className="messages-logo"
            alt="messages logo"
            onMouseOver={(e) => (e.currentTarget.src = messagesGreen)}
            onMouseLeave={(e) => (e.currentTarget.src = messagesWhite)}
          ></img>
          <div
            className="messages-sticker"
            style={{ visibility: messageVisibility }}
          >
            {messageCount}
          </div>
        </Link>
        <div className="message-sticker"></div>
      </div>
    </div>
  );
};

export default LoggedIn;
