import React, { useContext, useEffect, useState } from "react";
import "./chatroom.css";
import userWhite from "../../../assets/images/user-white.png";
import backArrowGray from "../../../assets/images/go-back-gray.png";
import backArrowGreen from "../../../assets/images/go-back-green.png";
import { Link } from "react-router-dom";
import ChatMessages from "./ChatMessages";
import { getChatData, sendMessage } from "../../../firebase/messages";
import { UserContext } from "../../../UserContext";

const ChatRoom = () => {
  const { currentUser, rerender, setRerender } = useContext(UserContext);

  const [user, setUser] = useState({});

  const chatRoomID = window.location.href.split("/")[5];

  const handleSend = async (e) => {
    const text = e.target.previousSibling.value;
    const textbar = document.querySelector("#message-input");
    sendMessage(text, currentUser.uid, chatRoomID);
    textbar.value = "";
    setRerender(!rerender);
  };

  useEffect(() => {
    if (currentUser) {
      const loadUserData = async () => {
        const user = await getChatData(chatRoomID, currentUser.uid);
        setUser(user);
      };
      loadUserData();
    }
  }, [currentUser]);

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
          <div className="chatRoom-userID">
            <img className="chatRoom-userPic" src={user.photoURL} alt=""></img>
            <div className="chatRoom-username">{user.username}</div>
          </div>

          <div className="chatRoom-go-back"></div>
        </div>
        <ChatMessages />
        <div className="chat-text-bar">
          <input
            type="text"
            id="message-input"
            placeholder="Type your message here"
          ></input>
          <button
            className="send-message"
            onClick={(e) => {
              handleSend(e);
              // sendMessage(e.target.previousSibling.value, currentUser.uid, chatRoomID);
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
