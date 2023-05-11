import { db } from "./firebase";
import {
  doc,
  updateDoc,
  // collection,
  // addDoc,
  // getDocs,
  getDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

// mg3GwHGO7CdiTszy3Dq1U7wJrtI3 post user id
// C4hPnDLgYFJVAAN1TEmx post id
// 195AHns4rscdhJ258T3WCXEn6bB2

const addComment = async (postText, postUserID, postID, currentUserID) => {
  const postRef = doc(db, "users/" + postUserID + "/posts", postID);

  const timestampExtended = new Date().toISOString().split("T").join(" ");
  const timestampDate = new Date();
  let month = timestampDate.getMonth();
  let day = timestampDate.getDate();
  let year = timestampDate.getFullYear();
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
  let newDate = months[month] + " " + day + ", " + year;

  let reply = {
    timestampExtended: timestampExtended,
    createDate: newDate,
    uniqueID: currentUserID,
    text: postText,
    Read: false,
    Likes: [],
    id: postID,
  };

  let newReplies = [];
  try {
    const getReplies = await getDoc(postRef);
    let replies = getReplies.data().Replies;
    for (let i = 0; i < replies.length; i++) {
      newReplies.push(replies[i]);
    }
    newReplies.push(reply);

    const update = await updateDoc(postRef, {
      Replies: newReplies,
    });
  } catch (error) {
    const errorMessage = error.message;
  }
};

const getReplies = async (userID, PostID) => {
  let ReplyArray = [];
  // const userRef = doc(db, "users/", userID);
  // const userSnap = await getDoc(userRef);
  const postRef = doc(db, "users/" + userID + "/posts/", PostID);
  try {
    const postSnap = await getDoc(postRef);
    let postReplies = postSnap.data().Replies;
    for (let i = 0; i < postReplies.length; i++) {
      let uniqueID = postReplies[i].uniqueID;
      let text = postReplies[i].text;
      let createDate = postReplies[i].createDate;
      let timestampExtended = postReplies[i].timestampExtended;
      let likes = postReplies[i].Likes;
      let id = postReplies[i].id;

      const userRef = doc(db, "users/", uniqueID);
      const userSnap = await getDoc(userRef);
      let name = userSnap.data().name;
      let username = userSnap.data().username;
      let photoURL = userSnap.data().photoURL;
      let comment = {
        uniqueID: uniqueID,
        name: name,
        photoURL: photoURL,
        username: username,
        text: text,
        createDate: createDate,
        timestampExtended: timestampExtended,
        Likes: likes,
        id: id,
      };
      ReplyArray.push(comment);
    }
  } catch (error) {
    const errorMessage = error.message;
  }
  ReplyArray.sort((a, b) => {
    let aTime = a.createTimeExtended;
    let bTime = b.createTimeExtended;
    if (aTime < bTime) return -1;
    if (aTime > bTime) return 1;
    return 0;
  });
  return ReplyArray;
};

export { addComment, getReplies };
// export { addComment, getAllPosts, getAllCurrentUserPosts, postThread };
