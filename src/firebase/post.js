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
    const allPosts = await getAllCurrentUserPosts();
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
  allPosts.sort((a, b) => {
    let aTime = a.createTime;
    let bTime = b.createTime;
    if (aTime < bTime) return -1;
    if (aTime > bTime) return 1;
    return 0;
  });
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

export { addPost, getAllPosts, getAllCurrentUserPosts };
