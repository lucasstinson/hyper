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

// Add a new document with a generated id
// const docRef = await addDoc(collection(db, "cities"), {
//   name: "Tokyo",
//   country: "Japan"
// });

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
    // const conversationRef = await addDoc(
    //   collection(db, "conversations/" + conversationID + "/messages"),
    //   {}
    // ); may want to add only when messages sent.
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
  let minutes = timestampDate.getUTCMinutes();

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
    //
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

export {
  createConversation,
  findConversation,
  getChatData,
  sendMessage,
  getMessages,
};
