import { auth, db } from "./firebase";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";
import { storage } from "./firebase";

const addLike = async (usersID, usersPostID, currentUserID) => {
  const postRef = doc(db, "users/" + usersID + "/posts", usersPostID);

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

  let like = {
    timestampExtended: timestampExtended,
    createDate: newDate,
    uniqueID: currentUserID,
    Read: false,
    id: usersPostID,
  };

  let newLikes = [];
  try {
    const getLikes = await getDoc(postRef);
    let likes = getLikes.data().Likes;
    for (let i = 0; i < likes.length; i++) {
      newLikes.push(likes[i]);
    }
    newLikes.push(like);

    const update = await updateDoc(postRef, {
      Likes: newLikes,
    });
  } catch (error) {
    const errorMessage = error.message;
  }
};

const deleteLike = async (usersID, usersPostID, currentUserID) => {
  const postRef = doc(db, "users/" + usersID + "/posts", usersPostID);

  let newLikes = [];

  try {
    const getLikes = await getDoc(postRef);
    let likes = getLikes.data().Likes;
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].uniqueID != currentUserID) {
        newLikes.push(likes[i]);
      }
    }
    const update = await updateDoc(postRef, {
      Likes: newLikes,
    });
  } catch (error) {
    const errorMessage = error.message;
  }
};

const addCommentLike = async (
  usersID,
  usersPostID,
  currentUserID,
  uniqueTimeStamp
) => {
  const postRef = doc(db, "users/" + usersID + "/posts", usersPostID);

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

  let like = {
    timestampExtended: timestampExtended,
    createDate: newDate,
    uniqueID: currentUserID,
    Read: false,
  };

  let newLikes = [];
  let index = 0;

  try {
    const getPost = await getDoc(postRef);
    let replies = getPost.data().Replies;
    for (let i = 0; i < replies.length; i++) {
      if (replies[i].timestampExtended == uniqueTimeStamp) {
        index = i;
        if (replies[i].Likes.length < 1) {
          newLikes.push(like);
        } else {
          for (let j = 0; j < replies[i].Likes.length; j++) {
            newLikes.push(replies[i].Likes[j]);
          }
          newLikes.push(like);
        }
      }
    }
    replies[index].Likes = newLikes;
    const update = await updateDoc(postRef, {
      Replies: replies,
    });
  } catch (error) {
    const errorMessage = error.message;
  }
};

const deleteCommentLike = async (
  usersPostID,
  postID,
  currentUserID,
  uniqueTimeStamp
) => {
  const postRef = doc(db, "users/" + usersPostID + "/posts", postID);
  let newLikes = [];
  let index = [];

  try {
    const getPost = await getDoc(postRef);
    let replies = getPost.data().Replies;
    for (let i = 0; i < replies.length; i++) {
      if (replies[i].timestampExtended == uniqueTimeStamp) {
        for (let j = 0; j < replies[i].Likes.length; j++) {
          index = i;
          if (replies[i].Likes[j].uniqueID != currentUserID) {
            newLikes.push(replies[i].Likes[j]);
          }
        }
      }
    }
    replies[index].Likes = newLikes;
    console.log(replies);
    const update = await updateDoc(postRef, {
      Replies: replies,
    });
  } catch (error) {
    const errorMessage = error.message;
  }
};

export { addLike, deleteLike, addCommentLike, deleteCommentLike };
