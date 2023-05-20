import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

// Allows user to sign in with email
const logIn = async (email, password) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const user = credentials.user;
    window.location.href = "#/";
  } catch (error) {
    const errorCode = error.code;
    const loginError = document.querySelector(".log-in-error");
    if (errorCode == "auth/too-many-requests") {
      loginError.textContent =
        "This account has been disabled for too many failed attempts";
    } else {
      loginError.textContent =
        "The username or password you entered is incorrect, please try again!";
    }
    loginError.classList.add("active");
    setTimeout(() => {
      loginError.classList.remove("active");
      loginError.textContent = " ";
    }, 5000);
  }
};

export { logIn };
