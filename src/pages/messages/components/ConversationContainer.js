import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../../../firebase/signup";
import { UserContext } from "../../../UserContext";

const ConversationContainer = (props) => {
  const { currentUser, setMessageCount, messageCount } =
    useContext(UserContext);
  const { conversation } = props;

  if (conversation.Read) {
    return (
      <div className="message-container" key={conversation.id}>
        <div className="message-user-container">
          <img
            src={conversation.photoURL}
            className="message-user"
            alt=""
          ></img>
        </div>
        <div className="message-info-container">
          <Link to={`/messages/${conversation.id}`} className="message-link">
            <div className="messager-info">
              <div className="messager-name">
                {conversation.name}{" "}
                <span className="messages-username">
                  {conversation.username}
                </span>
              </div>
              <div className="message-last-date">
                {conversation.lastMessageDate}
              </div>
            </div>
            <div className="message-last-message">
              {conversation.lastMessage}
            </div>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="message-container-unread" key={conversation.id}>
        <div className="message-user-container">
          <img
            src={conversation.photoURL}
            className="message-user"
            alt=""
          ></img>
        </div>
        <div className="message-info-container">
          <Link
            to={`/messages/${conversation.id}`}
            className="message-link"
            onClick={() => setMessageCount(messageCount - 1)}
          >
            <div className="messager-info">
              <div className="messager-name">
                {conversation.name}{" "}
                <span className="messages-username">
                  {conversation.username}
                </span>
              </div>
              <div className="message-last-date">
                {conversation.lastMessageDate}
              </div>
            </div>
            <div className="message-last-message">
              {conversation.lastMessage}
            </div>
          </Link>
        </div>
      </div>
    );
  }
};

export default ConversationContainer;
