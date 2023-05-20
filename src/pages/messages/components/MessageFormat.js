import React, { useContext } from "react";
import { UserContext } from "../../../UserContext";

const MessageFormat = (props) => {
  // context hook to current logged in user info.
  const { currentUser } = useContext(UserContext);

  // state variables of message
  const { message } = props;

  // if the message is from the currently logged in user it will be
  // styled with a green color and aligned to the right.
  // else the color will be green and aligned left.
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
