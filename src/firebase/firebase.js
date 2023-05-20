import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Gets currentUser details based on logged in | logged out
const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setCurrentUser(user));
  }, []);
  return currentUser;
};

export { auth, db, useAuth, storage };
