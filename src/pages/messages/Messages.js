import React from "react";
import "./messages.css";
import userWhite from "../../assets/images/user-white.png";

const Messages = () => {
  return (
    <div className="Messages">
      <div className="messages-container">
        <div className="messages-title-container">
          <div className="messages-title">Messages</div>
        </div>
        <div className="messages-list-container">
          <div className="message-container">
            <div className="message-user-container">
              <img
                src={userWhite}
                className="message-user"
                alt="user pic"
              ></img>
            </div>
            <div className="message-info-container">
              <div className="messager-info">
                <div className="messager-name">user's name @user_name</div>
                <div className="message-last-date">Aug 12 2022</div>
              </div>
              <div className="message-last-message">
                first 30 characters of messsage...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
