import React, { useContext, useEffect, useState } from "react";
import "./messages.css";
import userWhite from "../../assets/images/user-white.png";
import { UserContext } from "../../UserContext";
import { getConversations } from "../../firebase/messages";
import Conversations from "./components/Conversations";

const Messages = () => {
  const { currentUser } = useContext(UserContext);

  const [conversations, setConversations] = useState([]);
  // useEffect(() => {
  //   if (currentUser) {
  //     const getConversations(currentUser.uid);
  //   }
  // }, [currentUser]);

  return (
    <div className="Messages">
      <div className="messages-container">
        <div className="messages-title-container">
          <div className="messages-title">Messages</div>
        </div>
        {/* <div className="messages-list-container"> */}
        <Conversations />
        {/* <div className="message-container">
            <div className="message-user-container">
              <img
                src={userWhite}
                className="message-user"
                alt="user pic"
              ></img>
            </div>
            <div className="message-info-container">
              <div className="messager-info">
                <div className="messager-name">
                  user's name{" "}
                  <span className="messages-username">@user_name</span>
                </div>
                <div className="message-last-date">Aug 12 2022</div>
              </div>
              <div className="message-last-message">
                first 30 characters of messsage...
              </div>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Messages;
