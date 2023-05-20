import { db, auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, getDocs, collection } from "firebase/firestore";

// Creates user on intial sign up and users Add user helper function
const createUser = async (email, password, username) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = credentials.user;
    addUser(username, user.email, user.uid);
    window.location.href = `#/profile/${user.uid}/settings`;
  } catch (error) {
    console.log(error.message);
    const signUpError = document.querySelector(".sign-up-error");
    signUpError.textContent = "There was an error. Please try again";
    signUpError.classList.add("active");
    setTimeout(() => {
      signUpError.classList.remove("active");
    }, 5000);
  }
};

// Helper Function that adds user data to firestore with unique ID
const addUser = async (username, email, uniqueID) => {
  const photoURL =
    "https://firebasestorage.googleapis.com/v0/b/hyper-fc336.appspot.com/o/default.png?alt=media&token=bccd07fe-4e34-4974-9c55-a8d67dbf3c59";
  try {
    const docRef = await setDoc(doc(db, "users", uniqueID), {
      uniqueID: uniqueID,
      email: email,
      name: "",
      username: "@" + username,
      photoURL: photoURL,
      bio: "",
      followers: [],
      following: [],
    });
    updateProfile(auth.currentUser, { photoURL: photoURL });
  } catch (error) {
    const errorMessage = error.message;
    console.error("Error adding document: ", errorMessage);
  }
};

// gets all emails on user creation, used in client side validation
const getEmails = async () => {
  let emails = [];
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      let email = doc.data().email;
      emails.push(email);
    });
  } catch (error) {
    const errorMessage = error.message;
  }
  return emails;
};

// gets all usernames on user creation, used in client side validation
const getUsernames = async () => {
  let usernames = [];
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      let rawUsername = doc.data().username;
      const username = rawUsername.split("@")[1];
      usernames.push(username);
    });
  } catch (error) {
    const errorMessage = error.message;
  }
  return usernames;
};

export { createUser, addUser, getEmails, getUsernames };
