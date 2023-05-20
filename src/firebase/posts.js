import { db, auth } from "./firebase";
import {
  doc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";

// adds post to firebase with identifying information
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
    Replies: [],
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

// gets all posts related to the currently viewed users unique ID
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

// gets all made posts and attaches the connected profile ID to it.
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

// Helper function that gathers all user posts
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

// gets thread and profile information related to a post
// and based on the posts unique ID
const postThread = async (postID) => {
  let postArray = [];
  let userIDs = [];
  const userRef = collection(db, "users");

  let userID = "";
  try {
    const querySnapshot = await getDocs(userRef);

    querySnapshot.forEach((doc) => {
      let user = doc.data().uniqueID;
      userIDs.push(user);
    });
    for (let i = 0; i < userIDs.length; i++) {
      let docRef = doc(db, "users/" + userIDs[i] + "/posts/", postID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        userID = userIDs[i];
      }
    }

    const userSnap = await getDoc(doc(db, "users/", userID));
    let username = userSnap.data().username;
    let name = userSnap.data().name;
    let photoURL = userSnap.data().photoURL;
    let uniqueID = userID;

    let post = await postSnap(userID, postID);
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

// helper function that gathers the specific post data
const postSnap = async (userID, postID) => {
  const postRef = doc(db, "users/" + userID + "/posts/", postID);
  try {
    const postSnapshot = await getDoc(postRef);
    let post = postSnapshot.data();
    return post;
  } catch (error) {
    const errorMessage = error.message;
  }
};

export { addPost, getAllPosts, getAllCurrentUserPosts, postThread };
