import React, { useState, useEffect, useContext } from "react";
import { getMessages, sendMessage } from "../../../firebase/messages";
import MessageFormat from "./MessageFormat";
import { UserContext } from "../../../UserContext";
const ChatMessages = () => {
  const { currentUser, rerender } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  const chatRoomIDArray = window.location.href.split("/");
  const chatRoomID = chatRoomIDArray[chatRoomIDArray.length - 1];
  const generateMessages = async () => {
    try {
      const messages = await getMessages(chatRoomID);
      let allMessages = messages.map((message) => (
        <MessageFormat message={message} key={message.createTimeExtended} />
      ));
      setMessages(allMessages);
    } catch (error) {
      const errorMessage = error.message;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      generateMessages();
    }, [1000]);
  }, [rerender]);

  return <div className="chatRoom-message-container">{messages}</div>;
};

export default ChatMessages;
