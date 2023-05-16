import React, { useContext, useEffect, useState } from "react";
import { pendingMessages, getConversations } from "../../../firebase/messages";
import { UserContext } from "../../../UserContext";
import { Link } from "react-router-dom";
import ConversationContainer from "./ConversationContainer";

const Conversations = (props) => {
  const { currentUser } = useContext(UserContext);

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (currentUser) {
      pendingMessages(currentUser.uid);
    }
  }, [currentUser]);

  const generateConversations = async () => {
    try {
      const conversations = await getConversations(currentUser.uid);
      const allConversations = conversations.map((conversation) => (
        <ConversationContainer
          conversation={conversation}
          key={conversation.id}
        />
      ));
      setConversations(allConversations);
    } catch (error) {
      const errorMessage = error.message;
    }
  };

  useEffect(() => {
    if (currentUser) {
      generateConversations();
    }
  }, [currentUser]);

  return <div className="messages-list-container">{conversations}</div>;
  // <div className="message-container">
  //   <div className="message-user-container">
  //     <img src={userWhite} className="message-user" alt="user pic"></img>
  //   </div>
  //   <div className="message-info-container">
  //     <div className="messager-info">
  //       <div className="messager-name">
  //         user's name <span className="messages-username">@user_name</span>
  //       </div>
  //       <div className="message-last-date">Aug 12 2022</div>
  //     </div>
  //     <div className="message-last-message">
  //       first 30 characters of messsage...
  //     </div>
  //   </div>
  // </div>
};

export default Conversations;
