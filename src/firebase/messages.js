import { db, auth } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";

import { getProfileData } from "./users";

const createConversation = async (currentUserID, OtherUserID) => {
  const users = [currentUserID, OtherUserID];
  try {
    const docRef = await addDoc(collection(db, "conversations"), {
      users,
    });
    let conversationID = docRef.id;
    const update = await updateDoc(doc(db, "conversations/", conversationID), {
      id: conversationID,
    });
    return conversationID;
  } catch (error) {
    const errorMessage = error.message;
  }
};

const findConversation = async (currentUserID, OtherUserID) => {
  const conversationRef = collection(db, "conversations/");
  let flag = false;
  let conversationID = "";
  try {
    const querySnapshot = await getDocs(conversationRef);
    querySnapshot.forEach((doc) => {
      let users = doc.data().users;
      if (users.includes(currentUserID) && users.includes(OtherUserID)) {
        conversationID = doc.data().id;
        flag = true;
      } else {
        return;
      }
    });
    if (!flag) {
      conversationID = await createConversation(currentUserID, OtherUserID);
    }
    return conversationID;
  } catch (error) {
    const errorMessage = error.message;
  }
};

const getChatData = async (chatRoomID, currentUserID) => {
  const conversationRef = doc(db, "conversations/", chatRoomID);
  let userID = "";
  try {
    const querySnapshot = await getDoc(conversationRef);
    let users = querySnapshot.data().users;
    for (let i = 0; i < users.length; i++) {
      if (users[i] != currentUserID) {
        userID = users[i];
      }
    }
    const userData = await getProfileData(userID);
    return userData;
  } catch (error) {
    const errorMessage = error.message;
  }
};

const sendMessage = async (text, currentUserID, chatRoomID) => {
  const timestampExtended = new Date().toISOString().split("T").join(" ");
  const timestampDate = new Date();
  let month = timestampDate.getMonth();
  let day = timestampDate.getDate();
  let year = timestampDate.getFullYear();

  let hour = timestampDate.getUTCHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let minutes = timestampDate.getUTCMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "December",
  ];
  let newDate =
    months[month] +
    " " +
    day +
    ", " +
    year +
    " " +
    hour +
    ":" +
    minutes +
    " UTC";
  const message = {
    text: text,
    createTimeExtended: timestampExtended,
    createDate: newDate,
    uniqueID: currentUserID,
    Read: false,
  };

  try {
    const messageRef = collection(
      db,
      "conversations/" + chatRoomID + "/messages"
    );
    const addPostsRef = await addDoc(messageRef, message);
  } catch (error) {
    const errorMessage = error.message;
  }
};

const getMessages = async (chatRoomID) => {
  const messagesRef = collection(
    db,
    "conversations/" + chatRoomID + "/messages"
  );

  let messages = [];
  try {
    const querySnapshot = await getDocs(messagesRef);
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    messages.sort((a, b) => {
      let aTime = a.createTimeExtended;
      let bTime = b.createTimeExtended;
      if (aTime < bTime) return -1;
      if (aTime > bTime) return 1;
      return 0;
    });
    return messages;
  } catch (error) {
    const errorMessage = error.message;
  }
};

const getConversations = async (currentUserID) => {
  const conversationRef = collection(db, "conversations/");

  let conversations = [];
  try {
    const querySnapshot = await getDocs(conversationRef);
    querySnapshot.forEach((doc) => {
      let users = doc.data().users;
      if (users.includes(currentUserID)) {
        for (let i = 0; i < users.length; i++) {
          if (users[i] != currentUserID) {
            let conversation = {
              id: doc.data().id,
              user: users[i],
            };
            conversations.push(conversation);
          }
        }
      }
    });
    for (let i = 0; i < conversations.length; i++) {
      const userData = await getProfileData(conversations[i].user);
      const lastMessage = await getLastMessage(
        conversations[i].id,
        currentUserID
      );
      conversations[i].username = userData.username;
      conversations[i].photoURL = userData.photoURL;
      conversations[i].name = userData.name;
      conversations[i].lastMessage =
        lastMessage.lastMessage.slice(0, 29) + "...";
      conversations[i].lastMessageDate = lastMessage.lastMessageDate;
      conversations[i].Read = lastMessage.Read;
    }
    conversations.sort((a, b) => {
      let aTime = a.lastMessageDate;
      let bTime = b.lastMessageDate;
      if (aTime < bTime) return 1;
      if (aTime > bTime) return -1;
      return 0;
    });
    return conversations;
  } catch (error) {
    const errorMessage = error.message;
  }
};

const getLastMessage = async (chatRoomID, currentUserID) => {
  const messagesRef = collection(
    db,
    "conversations/" + chatRoomID + "/messages"
  );

  let messages = [];
  try {
    const querySnapshot = await getDocs(messagesRef);
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    if (messages.length > 0) {
      messages.sort((a, b) => {
        let aTime = a.createTimeExtended;
        let bTime = b.createTimeExtended;
        if (aTime < bTime) return -1;
        if (aTime > bTime) return 1;
        return 0;
      });
      if (messages[messages.length - 1].uniqueID == currentUserID) {
        let message = {
          uniqueID: messages[messages.length - 1].uniqueID,
          Read: true,
          lastMessage: messages[messages.length - 1].text,
          lastMessageDate: messages[messages.length - 1].createDate,
        };
        return message;
      } else {
        let message = {
          uniqueID: messages[messages.length - 1].uniqueID,
          Read: messages[messages.length - 1].Read,
          lastMessage: messages[messages.length - 1].text,
          lastMessageDate: messages[messages.length - 1].createDate,
        };
        return message;
      }
    } else {
      let message = {
        lastMessage: "Conversations haven't started",
        lastMessageDate: "",
        Read: true,
      };
      return message;
    }
  } catch (error) {
    const errorMessage = error.message;
  }
};

const pendingMessages = async (currentUserID) => {
  const conversationRef = collection(db, "conversations/");
  let conversationIDs = [];
  let lastMessages = [];
  let count = 0;
  try {
    const querySnapshot = await getDocs(conversationRef);
    querySnapshot.forEach((doc) => {
      let users = doc.data().users;
      if (users.includes(currentUserID)) {
        conversationIDs.push(doc.data().id);
      }
    });
    for (let i = 0; i < conversationIDs.length; i++) {
      const lastMessage = await getLastMessage(conversationIDs[i]);
      if (lastMessage.uniqueID == currentUserID) {
        lastMessages.push(true);
      } else {
        lastMessages.push(lastMessage.Read);
      }
    }
    for (let i = 0; i < lastMessages.length; i++) {
      if (!lastMessages[i]) {
        count++;
      }
    }
    return count;
  } catch (error) {
    const errorMessage = error.message;
  }
};

const updatePendingMessages = async (chatRoomID, currentUserID) => {
  const messagesRef = collection(
    db,
    "conversations/" + chatRoomID + "/messages"
  );

  const messageIDs = [];
  try {
    const querySnapshot = await getDocs(messagesRef);
    querySnapshot.forEach((doc) => {
      if (doc.data().uniqueID != currentUserID && doc.data().Read == false) {
        messageIDs.push(doc.id);
      }
    });
    for (let i = 0; i < messageIDs.length; i++) {
      const updateMessages = await updateReadMessages(
        chatRoomID,
        messageIDs[i]
      );
    }
    // return messages;
  } catch (error) {
    const errorMessage = error.message;
  }
};

const updateReadMessages = async (chatRoomID, id) => {
  const messageRef = doc(db, "conversations/" + chatRoomID + "/messages", id);
  try {
    const updateRead = await updateDoc(messageRef, {
      Read: true,
    });
  } catch (error) {
    const errorMessage = error.message;
  }
};

export {
  createConversation,
  findConversation,
  getChatData,
  sendMessage,
  getMessages,
  getConversations,
  pendingMessages,
  updatePendingMessages,
};
