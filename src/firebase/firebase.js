// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA5g776y6szsc1h9l7u_hzJ28jzAnAzK8s",
  authDomain: "hyper-fc336.firebaseapp.com",
  projectId: "hyper-fc336",
  storageBucket: "hyper-fc336.appspot.com",
  messagingSenderId: "650906758237",
  appId: "1:650906758237:web:217c671ad7dd08c408f1b4",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth();

// Create an account with an email and password
async function createUser(auth, email, password) {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = credentials.user;
    console.log("Your account has been created");
    console.log("Username:", user.email);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  }
}

// Sign in with email and password after creation
async function signIn(auth, email, password) {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const user = credentials.user;
    console.log("You have succesffully logged in");
    console.log("Username:", user.email);
    loggedIn(user.email); // passes on user email to say whos logged in
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  }
}

// log out
async function logOut() {
  try {
    const signingOut = await signOut(auth);
    console.log("You have succesffully logged Out");
    loggedOut(); // logs out of email and updates buttons
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
}

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    loggedIn(user.email); // asses on user email to say whos logged in
    currentUser = user.email;
    readData();
  }
});

const db = getFirestore(app);
