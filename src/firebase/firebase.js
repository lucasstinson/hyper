import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
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
const currentUser = getAuth();

// Create an account with an email and password
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

// // Sign in with email and password after creation
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

// adds book Data to firestore with unique ID
const addUser = async (username, email, uniqueID) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      uniqueID: uniqueID,
      email: email,
      name: "",
      username: "@" + username,
      photoURL: "",
      bio: "",
    });
    console.log(docRef);
  } catch (error) {
    const errorMessage = error.message;
    console.error("Error adding document: ", errorMessage);
  }
};

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setCurrentUser(user));
  }, []);
  return currentUser;
};

const updateSettings = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    if (doc.data().user == currentUser.user) {
      // let id = doc.id;
      let bio = doc.data().bio;
      let email = doc.data().email;
      let name = doc.data().name;
      let photoURL = doc.data().photoURL;
      let uniqueID = doc.data().uniqueID;
      let username = doc.data().username;
      console.log(bio, email, name, photoURL, uniqueID, username);
    }
  });
};

const db = getFirestore(app);

export { createUser, useAuth, logOut, logIn, addUser, updateSettings };
