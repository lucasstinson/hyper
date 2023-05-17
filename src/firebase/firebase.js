import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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

//Initialize Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

// updates User Settings

const updateProfileImage = async (photo) => {
  const profileImage = photo;
  const userRef = doc(db, "users", auth.currentUser.uid);

  try {
    const update = await updateDoc(userRef, {
      photoURL: profileImage,
    });
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};

const updateSettings = async () => {
  const name = document.querySelector(".settings-profile-usersname").value;
  const bio = document.querySelector(".settings-bio-text").value;
  const userRef = doc(db, "users", auth.currentUser.uid);

  try {
    const update = await updateDoc(userRef, {
      name: name,
      bio: bio,
    });
    alert("Your account has been updated");
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setCurrentUser(user));
  }, []);
  return currentUser;
};

// Storage
const upload = async (file, currentUser) => {
  const fileRef = ref(storage, currentUser.uid + ".png");
  try {
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(auth.currentUser, { photoURL: photoURL });
    updateProfileImage(photoURL);
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};

export {
  auth,
  db,
  useAuth,
  updateSettings,
  upload,
  storage,
  updateProfileImage,
};
