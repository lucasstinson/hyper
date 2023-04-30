import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { storage } from "./firebase";

const updateLikes = async (usersID, usersPostID, currentUserID) => {
  const postRef = doc(db, "users/" + usersID + "/posts", usersPostID);

  let like = {
    uniqueID: currentUserID,
  };

  try {
    const update = await updateDoc(postRef, {
      Likes: [like],
    });
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};

export { updateLikes };
