import { auth, db } from "./firebase";
import { doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
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

const deleteLike = async (usersID, usersPostID, currentUserID) => {
  const postRef = doc(db, "users/" + usersID + "/posts", usersPostID);

  let newLikes = [];

  try {
    const getLikes = await getDoc(postRef);
    let likes = getLikes.data();
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
    console.log(errorMessage);
  }
};

export { addLike, deleteLike };
