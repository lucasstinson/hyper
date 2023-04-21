import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

// Sign in with email and password after creation
const logIn = async (email, password, username) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const user = credentials.user;
    console.log("You have succesffully logged in");
    console.log("Username:", user.email);
    console.log(user.displayName);
    console.log(user.photoURL);
    window.location.href = "#/";
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};

export { logIn };
