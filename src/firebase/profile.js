import { auth } from "./firebase";
import { signOut } from "firebase/auth";

// log out
const logOut = async () => {
  try {
    const signingOut = await signOut(auth);
    console.log("You have succesffully logged Out");
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};

export { logOut };
