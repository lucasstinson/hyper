import { auth } from "./firebase";
import { signOut } from "firebase/auth";

// log out current user
const logOut = async () => {
  try {
    const signingOut = await signOut(auth);
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};

export { logOut };
