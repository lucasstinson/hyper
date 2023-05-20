import { db } from "./firebase";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";

// get all notifications for a user with helper functions
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
  } catch (error) {
    const errorMessage = error.message;
  }
};

// helper function that gets all likes on users posts
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

// helper function that gets all replies/comments on users posts
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

// helper function that gets all users followers
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

// gets notifications and tags each notification with the associated
// user profile data.
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

// helper function that tags each notification with user data.
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

// updates Read flag of all notifications using helper functions
const updateRead = async (currentUserID) => {
  try {
    const likesRead = await updateLikesRead(currentUserID);
    const repliesRead = await updateRepliesRead(currentUserID);
    const followersRead = await updateFollowsRead(currentUserID);
  } catch (error) {
    const errorMessage = error.message;
  }
};

// helper function that gets all likes and updates likes
const updateLikesRead = async (currentUserID) => {
  const postsRef = collection(db, "users/" + currentUserID + "/posts");

  try {
    const querySnapshot = await getDocs(postsRef);

    querySnapshot.forEach((doc) => {
      let updatedLikes = [];
      let postID = doc.data().id;

      for (let i = 0; i < doc.data().Likes.length; i++) {
        if (doc.data().Likes[i].uniqueID != currentUserID) {
          const like = doc.data().Likes[i];
          like.Read = true;
          updatedLikes.push(like);
        } else {
          const like = doc.data().Likes[i];
          updatedLikes.push(like);
        }
      }

      updateLikes(currentUserID, postID, updatedLikes);
    });
  } catch (error) {
    const errorMessage = error.message;
  }
};

// helper function that updates likes in firebase
const updateLikes = async (currentUserID, postID, updatedLikes) => {
  const postRef = doc(db, "users/" + currentUserID + "/posts", postID);

  try {
    const updatingLikes = await updateDoc(postRef, {
      Likes: updatedLikes,
    });
  } catch (error) {
    const errorMessage = error.message;
  }
};

// helper function that gets all replies and updates replies
const updateRepliesRead = async (currentUserID) => {
  const postsRef = collection(db, "users/" + currentUserID + "/posts");

  try {
    const querySnapshot = await getDocs(postsRef);

    querySnapshot.forEach((doc) => {
      let updatedReplies = [];
      let postID = doc.data().id;

      for (let i = 0; i < doc.data().Replies.length; i++) {
        if (doc.data().Replies[i].uniqueID != currentUserID) {
          const reply = doc.data().Replies[i];
          reply.Read = true;
          updatedReplies.push(reply);
        } else {
          const reply = doc.data().Replies[i];
          updatedReplies.push(reply);
        }
      }

      updateReplies(currentUserID, postID, updatedReplies);
    });
  } catch (error) {
    const errorMessage = error.message;
  }
};

// helper function that updates replies in firebase
const updateReplies = async (currentUserID, postID, updatedReplies) => {
  const postRef = doc(db, "users/" + currentUserID + "/posts", postID);

  try {
    const updatingReplies = await updateDoc(postRef, {
      Replies: updatedReplies,
    });
  } catch (error) {
    const errorMessage = error.message;
  }
};

// helper function that gets all follows and updates follows
const updateFollowsRead = async (currentUserID) => {
  let updatedFollowers = [];
  const followRef = doc(db, "users", currentUserID);
  try {
    const userSnap = await getDoc(followRef);
    let followers = userSnap.data().followers;
    for (let i = 0; i < followers.length; i++) {
      let follower = {
        Read: true,
        timestampExtended: followers[i].timestampExtended,
        uniqueID: followers[i].uniqueID,
      };
      updatedFollowers.push(follower);
    }
    await updateDoc(followRef, {
      followers: updatedFollowers,
    });
  } catch (error) {
    const errorMessage = error.message;
  }
};

export {
  getLikes,
  getReplies,
  getFollowers,
  getNotifications,
  getUserNotifications,
  updateFollowsRead,
  updateRepliesRead,
  updateLikesRead,
  updateRead,
};

// console.log(getNotifications);
