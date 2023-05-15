import { db, auth } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

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

// try {
//   const docRef = await setDoc(doc(db, "users", uniqueID), {
//     uniqueID: uniqueID,
//     email: email,
//     name: "",
//     username: "@" + username,
//     photoURL: photoURL,
//     bio: "",
//     followers: [],
//     following: [],
//   });

// when you click messages it should create a conversation with that person

export { createConversation, findConversation };
