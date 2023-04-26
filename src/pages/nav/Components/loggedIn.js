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
  const { photoURL } = useContext(UserContext);
  const [showPost, setShowPost] = useState(false);
  const location = useLocation();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <div className="directory-container">
      <div className="directory-profile-container">
        <Link
          to={"/profile"}
          className={"nav-underline" + (url === "/profile" ? " active" : "")}
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
        </Link>
        <div className="messages-sticker"></div>
      </div>
    </div>
  );
};

export default LoggedIn;
