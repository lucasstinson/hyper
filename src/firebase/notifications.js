import { auth, db } from "./firebase";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";
import { storage } from "./firebase";

const getNotifications = async (currentUserID) => {
  let notifications = [];
  let count = 0;
  try {
    const likes = await getLikes(currentUserID);
    for (let i = 0; i < likes.length; i++) {
      if (!likes[i].Read) {
        count++;
      }
      notifications.push(likes[i]);
    }
    const replies = await getReplies(currentUserID);
    for (let i = 0; i < replies.length; i++) {
      if (!replies[i].Read) {
        count++;
      }
      notifications.push(replies[i]);
    }
    const followers = await getFollowers(currentUserID);
    for (let i = 0; i < followers.length; i++) {
      if (!followers[i].Read) {
        count++;
      }
      notifications.push(followers[i]);
    }
    return { notifications, count };
    // return notifications
  } catch (error) {
    const errorMessage = error.message;
  }
};

const getLikes = async (currentUserID) => {
  let likes = [];
  const postsRef = collection(db, "users/" + currentUserID + "/posts");
  try {
    const querySnapshot = await getDocs(postsRef);
    querySnapshot.forEach((doc) => {
      for (let i = 0; i < doc.data().Likes.length; i++) {
        if (doc.data().Likes[i].uniqueID != currentUserID) {
          likes.push(doc.data().Likes[i]);
        }
      }
    });
    // console.log(likes);
    return likes;
  } catch (error) {
    const errorMessage = error.message;
  }
};

const getReplies = async (currentUserID) => {
  let replies = [];
  const postsRef = collection(db, "users/" + currentUserID + "/posts");
  try {
    const querySnapshot = await getDocs(postsRef);
    querySnapshot.forEach((doc) => {
      for (let i = 0; i < doc.data().Replies.length; i++) {
        if (doc.data().Replies[i].uniqueID != currentUserID) {
          replies.push(doc.data().Replies[i]);
        }
      }
    });
    // console.log(replies);
    return replies;
  } catch (error) {
    const errorMessage = error.message;
  }
};

const getFollowers = async (currentUserID) => {
  let followers = [];
  const followRef = doc(db, "users", currentUserID);
  try {
    const docSnap = await getDoc(followRef);

    for (let i = 0; i < docSnap.data().followers.length; i++) {
      followers.push(docSnap.data().followers[i]);
    }
    // console.log(followers);
    return followers;
  } catch (error) {
    const errorMessage = error.message;
  }
};

const updateRead = () => {};
export { getLikes, getReplies, getFollowers, getNotifications };

// console.log(getNotifications);
