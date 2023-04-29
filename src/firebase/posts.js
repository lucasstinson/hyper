import { db, auth } from "./firebase";
import {
  doc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
  query,
  getDocs,
  where,
  getDoc,
} from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";
import { async } from "@firebase/util";

const addPost = async (postText) => {
  const userRef = doc(db, "users", auth.currentUser.uid);

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

  const post = {
    text: postText,
    createTimeExtended: timestampExtended,
    createDate: newDate,
    Reposts: [],
    Likes: [],
  };

  try {
    const postsRef = collection(db, "users/" + auth.currentUser.uid + "/posts");
    const addPostsRef = await addDoc(postsRef, post);
    const update = await updateDoc(
      doc(db, "users/" + auth.currentUser.uid + "/posts", addPostsRef.id),
      {
        id: addPostsRef.id,
      }
    );
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
    console.log(error);
  }
};

const getAllCurrentUserPosts = async (userID) => {
  let allPosts = [];

  const userRef = doc(db, "users/", userID);
  const userPostsRef = collection(db, "users/" + userID + "/posts");

  try {
    const userSnap = await getDoc(userRef);
    let username = userSnap.data().username;
    let name = userSnap.data().name;
    let photoURL = userSnap.data().photoURL;
    let uniqueID = userID;

    const querySnapshot = await getDocs(userPostsRef);
    querySnapshot.forEach((doc) => {
      let postData = doc.data();
      let post = {
        username: username,
        name: name,
        photoURL: photoURL,
        uniqueID: uniqueID,
        post: postData,
      };
      allPosts.push(post);
    });
  } catch (error) {
    const errorMessage = error.message;
  }
  allPosts.sort((a, b) => {
    let aTime = a.post.createTimeExtended;
    let bTime = b.post.createTimeExtended;
    if (aTime < bTime) return 1;
    if (aTime > bTime) return -1;
    return 0;
  });
  return allPosts;
};

const getAllPosts = async () => {
  let allPosts = [];
  let newPosts = [];
  let userRef = collection(db, "users/");
  try {
    const userQuerySnapshot = await getDocs(userRef);
    userQuerySnapshot.forEach((doc) => {
      let uniqueID = doc.data().uniqueID;
      let name = doc.data().name;
      let username = doc.data().username;
      let photoURL = doc.data().photoURL;
      let userID = doc.data().uniqueID;

      let loadAllPosts = async (uniqueID, name, username, photoURL, userID) => {
        try {
          let postData = await getPosts(
            uniqueID,
            name,
            username,
            photoURL,
            userID
          );
          for (let i = 0; i < postData.length; i++) {
            allPosts.push(postData[i]);
          }
        } catch (error) {
          let errorMessage = error.message;
        }
        return allPosts;
      };
      newPosts = loadAllPosts(uniqueID, name, username, photoURL, userID);
    });
  } catch (error) {
    const errorMessage = error.message;
  }
  return newPosts;
};

const getPosts = async (uniqueID, name, username, photoURL, userID) => {
  let postsRef = collection(db, "users/" + uniqueID + "/posts");
  let posts = [];
  try {
    const postQuerySnapshot = await getDocs(postsRef);
    postQuerySnapshot.forEach((doc) => {
      let userPost = {
        name: name,
        username: username,
        photoURL: photoURL,
        post: doc.data(),
        uniqueID: userID,
      };
      posts.push(userPost);
    });
  } catch (error) {
    const errorMessage = error.message;
  }
  return posts;
};

const postThread = async (userID, postID) => {
  let postArray = [];
  const userRef = doc(db, "users/", userID);
  const postRef = doc(db, "users/" + userID + "/posts/", postID);
  try {
    const userSnap = await getDoc(userRef);
    let username = userSnap.data().username;
    let name = userSnap.data().name;
    let photoURL = userSnap.data().photoURL;
    let uniqueID = userID;

    const postSnap = await getDoc(postRef);
    let post = postSnap.data();

    const postData = {
      uniqueID: uniqueID,
      username: username,
      name: name,
      photoURL: photoURL,
      post: post,
    };
    postArray.push(postData);
  } catch (error) {
    const errorMessage = error.message;
  }
  return postArray;
};
const postID = "T7P28we3x2iRCmH8wjHn";
const userID = "Z3sah7MIHDcw6ekWU7bYBX2h1pp2";
postThread(userID, postID);

export { addPost, getAllPosts, getAllCurrentUserPosts, postThread };
