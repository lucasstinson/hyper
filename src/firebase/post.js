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
    const postsRef = await addDoc(
      collection(db, "users/" + auth.currentUser.uid + "/posts"),
      post
    );
    // const update = await updateDoc(userRef, {
    //   posts: [...allPosts, post],
    // });
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
    console.log(error);
  }
};

const getAllCurrentUserPosts = async () => {
  let allPosts = [];

  const currentUserID = auth.currentUser.uid;
  const userRef = collection(db, "users/" + currentUserID + "/posts");
  const userQuery = query(userRef);

  try {
    const querySnapshot = await getDocs(userQuery);

    querySnapshot.forEach((doc) => {
      let post = doc.data();
      allPosts.push(post);
    });
  } catch (error) {
    const errorMessage = error.message;
  }
  allPosts.sort((a, b) => {
    let aTime = a.createTimeExtended;
    let bTime = b.createTimeExtended;
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

      let loadAllPosts = async (uniqueID, name, username, photoURL) => {
        try {
          let postData = await getPosts(uniqueID, name, username, photoURL);
          for (let i = 0; i < postData.length; i++) {
            allPosts.push(postData[i]);
          }
        } catch (error) {
          let errorMessage = error.message;
        }
        return allPosts;
      };
      newPosts = loadAllPosts(uniqueID, name, username, photoURL);
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
  return newPosts;
};

const getPosts = async (uniqueID, name, username, photoURL) => {
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
      };
      posts.push(userPost);
    });
  } catch (error) {
    const errorMessage = error.message;
  }
  return posts;
};

getAllPosts();

export { addPost, getAllPosts, getAllCurrentUserPosts };

// username, usersname, photoURL

// const getAllCurrentUserPosts = async () => {
//   let allPosts = [];

//   const currentUserID = auth.currentUser.uid;
//   const userRef = collection(db, "users/" + currentUserID + "/posts");
//   const userQuery = query(userRef);

//   try {
//     const querySnapshot = await getDocs(userQuery);

//     querySnapshot.forEach((doc) => {
//       let post = doc.data();
//       allPosts.push(post);
//     });
//   } catch (error) {
//     const errorMessage = error.message;
//   }
//   allPosts.sort((a, b) => {
//     let aTime = a.createTimeExtended;
//     let bTime = b.createTimeExtended;
//     if (aTime < bTime) return 1;
//     if (aTime > bTime) return -1;
//     return 0;
//   });
//   return allPosts;
// };
