import React, { useContext, useEffect, useState } from "react";
import { pendingMessages, getConversations } from "../../../firebase/messages";
import { UserContext } from "../../../UserContext";
import { Link } from "react-router-dom";
import ConversationContainer from "./ConversationContainer";

const Conversations = (props) => {
  // context hook to current logged in user info.
  const { currentUser } = props;

  // Initial conversation value
  const [conversations, setConversations] = useState([]);

  // gets all conversations for the current logged in user,
  // then maps the JSX data to the conversations variable.
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

  // on CurrentUser change, will get the pending messages
  useEffect(() => {
    if (currentUser) {
      pendingMessages(currentUser.uid);
    }
  }, [currentUser]);

  //  on CurrentUser change, will generate all user conversations
  useEffect(() => {
    generateConversations();
  }, [currentUser]);

  return <div className="messages-list-container">{conversations}</div>;
};

export default Conversations;
