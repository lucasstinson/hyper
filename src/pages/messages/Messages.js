import React, { useContext, useEffect, useState } from "react";
import "./messages.css";
import userWhite from "../../assets/images/user-white.png";
import { UserContext } from "../../UserContext";
import { getConversations } from "../../firebase/messages";
import Conversations from "./components/Conversations";

const Messages = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Messages">
      <div className="messages-container">
        <div className="messages-title-container">
          <div className="messages-title">Messages</div>
        </div>
        <Conversations />
      </div>
    </div>
  );
};

export default Messages;
