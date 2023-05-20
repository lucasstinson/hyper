import React, { useContext, useEffect, useState } from "react";
import "./chatroom.css";
import backArrowGray from "../../../assets/images/go-back-gray.png";
import backArrowGreen from "../../../assets/images/go-back-green.png";
import { Link } from "react-router-dom";
import ChatMessages from "./ChatMessages";
import {
  getChatData,
  sendMessage,
  updatePendingMessages,
  pendingMessages,
} from "../../../firebase/messages";
import { UserContext } from "../../../UserContext";

const ChatRoom = () => {
  // context hook to current logged in user info.
  const { currentUser, rerender, setRerender, setMessageCount } =
    useContext(UserContext);

  // Initial user value
  const [user, setUser] = useState({});

  // initial disabled flag of send message button
  const [disabled, setDisabled] = useState(true);

  // Variables that for the unique ID that represents the chat.
  const chatRoomIDArray = window.location.href.split("/");
  const chatRoomID = chatRoomIDArray[chatRoomIDArray.length - 1];

  // when send is clicked the message is added to firebase
  // the text is cleared and the rerender flag is updated
  const handleSend = async (e) => {
    const text = e.target.previousSibling.value;
    const textbar = document.querySelector("#message-input");
    sendMessage(text, currentUser.uid, chatRoomID);
    textbar.value = "";
    setRerender(!rerender);
  };

  // updates the disabled send button based on if text exists
  const validInputs = (e) => {
    if (e.target.value) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  // on currentUser updates the displayed messages, sets the user
  // updates firebase on the unseen messages to be listed as read
  // then updates the unseen message count after a 3 sec delay
  useEffect(() => {
    if (currentUser) {
      const loadUserData = async () => {
        const user = await getChatData(chatRoomID, currentUser.uid);
        setUser(user);
      };
      loadUserData();
      updatePendingMessages(chatRoomID, currentUser.uid);
      setTimeout(() => {
        const loadMessages = async () => {
          try {
            const messages = await pendingMessages(currentUser.uid);
            setMessageCount(messages);
          } catch (error) {
            const errorMessage = error.message;
          }
        };
        loadMessages();
      }, [3000]);
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
            onChange={(e) => validInputs(e)}
          ></input>
          <button
            className="send-message"
            disabled={disabled}
            onClick={(e) => {
              handleSend(e);
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
