import React, { useState, useEffect, useContext } from "react";
import { getMessages, sendMessage } from "../../../firebase/messages";
import MessageFormat from "./MessageFormat";
import { UserContext } from "../../../UserContext";
const ChatMessages = () => {
  // context hook for rerender flag.
  const { rerender } = useContext(UserContext);

  // Initial messages value
  const [messages, setMessages] = useState([]);

  // Variables that for the unique ID that represents the chat.
  const chatRoomIDArray = window.location.href.split("/");
  const chatRoomID = chatRoomIDArray[chatRoomIDArray.length - 1];

  // get all messages related to the chat room unique ID,
  // then maps the JSX values to the messages state
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

  // on mount generatesMessages after a 1 sec delay
  useEffect(() => {
    setTimeout(() => {
      generateMessages();
    }, [1000]);
  }, []);

  // if rerender flag changes, generatemessages after a 1.5 sec delay
  useEffect(() => {
    setTimeout(() => {
      generateMessages();
    }, [1500]);
  }, [rerender]);

  return <div className="chatRoom-message-container">{messages}</div>;
};

export default ChatMessages;
