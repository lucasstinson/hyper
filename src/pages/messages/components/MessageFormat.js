import React, { useContext } from "react";
import { UserContext } from "../../../UserContext";

const MessageFormat = (props) => {
  const { currentUser } = useContext(UserContext);
  const { message } = props;
  if (message.uniqueID == currentUser.uid) {
    return (
      <div className="chatRoom-message-data" key={message.createTimeExtended}>
        <div className="chatRoom-last-message">{message.text}</div>
        <div className="chatRoom-sent-date">{message.createDate}</div>
      </div>
    );
  } else {
    return (
      <div
        className="chatRoom-message-data-user"
        key={message.createTimeExtended}
      >
        <div className="chatRoom-last-message-user">{message.text}</div>
        <div className="chatRoom-sent-date-user">{message.createDate}</div>
      </div>
    );
  }
};

export default MessageFormat;
