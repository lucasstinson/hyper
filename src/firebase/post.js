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
} from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";

const addPost = async (postText) => {
  const userRef = doc(db, "users", auth.currentUser.uid);

  const timestamp = new Date().toISOString().split("T").join(" ");

  const post = {
    text: postText,
    createTime: timestamp,
    Reposts: [],
    Likes: [],
  };

  try {
    const allPosts = await getAllCurrentUserPosts();
    console.log(allPosts);
    const update = await updateDoc(userRef, {
      posts: [...allPosts, post],
    });
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
    console.log(error);
  }
};

const getAllCurrentUserPosts = async () => {
  let allPosts = [];

  const currentUserID = auth.currentUser.uid;
  const userRef = collection(db, "users");
  const userQuery = query(userRef, where("uniqueID", "==", currentUserID));

  try {
    const querySnapshot = await getDocs(userQuery);

    querySnapshot.forEach((doc) => {
      for (let i = 0; i < doc.data().posts.length; i++) {
        let post = doc.data().posts[i];
        allPosts.push(post);
      }
    });
  } catch (error) {
    const errorMessage = error.message;
  }
  console.log(allPosts);
  return allPosts;
};

const getAllPosts = async () => {
  let allPosts = [];
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      for (let i = 0; i < doc.data().posts.length; i++) {
        let post = doc.data().posts[i];
        allPosts.push(post);
      }
    });
  } catch (error) {
    const errorMessage = error.message;
  }
  return allPosts;
};

export { addPost, getAllPosts };
