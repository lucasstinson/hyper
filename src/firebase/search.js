import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";

const getUserInfo = async () => {
  let usernames = [];
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      let rawUsername = doc.data().username;
      const username = rawUsername.split("@")[1];
      const photoURL = doc.data().photoURL;
      const uniqueID = doc.data().uniqueID;

      let user = {
        username: username,
        photoURL: photoURL,
        uniqueID: uniqueID,
      };
      usernames.push(user);
    });
  } catch (error) {
    const errorMessage = error.message;
  }
  return usernames;
};

export { getUserInfo };
