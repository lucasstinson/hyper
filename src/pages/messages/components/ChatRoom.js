import React, { useState } from "react";
import "./chatroom.css";
import userWhite from "../../../assets/images/user-white.png";
import backArrowGray from "../../../assets/images/go-back-gray.png";
import backArrowGreen from "../../../assets/images/go-back-green.png";
import { Link } from "react-router-dom";
import ChatMessages from "./ChatMessages";

// {backArrow}{""}Back to Messages

const ChatRoom = () => {
  return (
    <div className="chatRoom">
      <div className="chatRoom-container">
        <div className="chatRoom-title-container">
          <Link to={"/messages"} className="back-to-messages">
            <img
              className="chatRoom-go-back-arrow"
              src={backArrowGray}
              onMouseOver={(e) => (e.currentTarget.src = backArrowGreen)}
              onMouseLeave={(e) => (e.currentTarget.src = backArrowGray)}
              alt=""
            ></img>
          </Link>
          <div className="chatRoom-username">Username</div>
          <div className="chatRoom-go-back"></div>
        </div>
        <ChatMessages />
        <div className="chat-text-bar">
          <input
            type="text"
            id="message-input"
            placeholder="Type your message here"
          ></input>
          <button className="send-message">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
