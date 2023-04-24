import { db, auth, upload } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const createUser = async (email, password, username) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = credentials.user;
    const uniqueID = user.uid;
    console.log("Your account has been created");
    console.log("Username:", user.email);
    console.log("Unique id", user.uid);
    addUser(username, user.email, user.uid);
    window.location.href = "#/profile/settings";
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};

// Add user data to firestore with unique ID
const addUser = async (username, email, uniqueID) => {
  try {
    const docRef = await setDoc(doc(db, "users", uniqueID), {
      uniqueID: uniqueID,
      email: email,
      name: "",
      username: "@" + username,
      photoURL: "",
      bio: "",
      followers: 0,
      following: 0,
      posts: 0,
    });
  } catch (error) {
    const errorMessage = error.message;
    console.error("Error adding document: ", errorMessage);
  }
};

export { createUser, addUser };
