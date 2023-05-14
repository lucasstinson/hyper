import React, { useState, useEffect } from "react";

const ChatMessages = () => {
  const [messages, setMessages] = useState([]);

  const generateMessages = async () => {
    <div className="chatRoom-message-data">
      <div className="chatRoom-last-message">{/* {text} */}</div>
      <div className="chatRoom-sent-date">{/* {timestamp} */}</div>
    </div>;
  };
  return <div className="chatRoom-message-container">{messages}</div>;
};

export default ChatMessages;
