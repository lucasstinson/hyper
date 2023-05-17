import React, { useContext, useEffect, useState } from "react";
import { pendingMessages, getConversations } from "../../../firebase/messages";
import { UserContext } from "../../../UserContext";
import { Link } from "react-router-dom";
import ConversationContainer from "./ConversationContainer";

const Conversations = (props) => {
  const { currentUser } = props;

  const [conversations, setConversations] = useState([]);

  const generateConversations = async () => {
    try {
      const conversations = await getConversations(currentUser.uid);
      console.log(conversations);
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
      pendingMessages(currentUser.uid);
    }
  }, [currentUser]);

  useEffect(() => {
    generateConversations();
  }, [currentUser]);

  return <div className="messages-list-container">{conversations}</div>;
};

export default Conversations;
