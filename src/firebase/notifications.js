import { db } from "./firebase";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";
import { storage } from "./firebase";
import { getUsernames } from "./signup";

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
    notifications.sort((a, b) => {
      let aTime = a.timestampExtended;
      let bTime = b.createTimeExtended;
      if (aTime < bTime) return 1;
      if (aTime > bTime) return -1;
      return 0;
    });
    return { notifications, count };
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
          const like = doc.data().Likes[i];
          like.type = "like";
          likes.push(like);
        }
      }
    });
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
          const reply = doc.data().Replies[i];
          reply.type = "reply";
          replies.push(reply);
        }
      }
    });
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
      let follower = docSnap.data().followers[i];
      follower.type = "follower";
      followers.push(follower);
    }
    return followers;
  } catch (error) {
    const errorMessage = error.message;
  }
};

const getUserNotifications = async (currentUserID) => {
  let updatedNotifications = [];

  try {
    const { notifications } = await getNotifications(currentUserID);
    const userTaggedNotificaitons = await getUserInfo(notifications);
    updatedNotifications = userTaggedNotificaitons;
    return updatedNotifications;
  } catch (error) {
    const errorMessage = error.message;
  }
};

const getUserInfo = async (notifications) => {
  let allNotifications = [];
  try {
    for (let i = 0; notifications.length; i++) {
      const userSnap = await getDoc(
        doc(db, "users", notifications[i].uniqueID)
      );
      const notification = notifications[i];
      notification.username = userSnap.data().username;
      notification.photoURL = userSnap.data().photoURL;
      allNotifications.push(notification);
    }
  } catch (error) {
    const errorMessage = error.message;
  }
  return allNotifications;
};

const updateRead = () => {};

export {
  getLikes,
  getReplies,
  getFollowers,
  getNotifications,
  getUserNotifications,
};

// console.log(getNotifications);
