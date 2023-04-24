import { db, auth, storage } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { getURL } from "./users";

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
    console.log("Unique id", uniqueID);
    addUser(username, user.email, user.uid);
    window.location.href = "#/profile/settings";
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};

// Add user data to firestore with unique ID
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
      followers: 0,
      following: 0,
      posts: 0,
    });
    updateProfile(auth.currentUser, { photoURL: photoURL });
  } catch (error) {
    const errorMessage = error.message;
    console.error("Error adding document: ", errorMessage);
  }
};

// const upload = async (file, currentUser) => {
//   const fileRef = ref(storage, currentUser.uid + ".png");
//   try {
//     const snapshot = await uploadBytes(fileRef, file);
//     const photoURL = await getDownloadURL(fileRef);
//     updateProfile(auth.currentUser, { photoURL: photoURL });
//     updateProfileImage(photoURL);
//   } catch (error) {
//     const errorMessage = error.message;
//     console.log(errorMessage);
//   }
// };

// const updateProfileImage = async (photo) => {
//   const profileImage = photo;
//   const userRef = doc(db, "users", auth.currentUser.uid);

//   try {
//     const update = await updateDoc(userRef, {
//       photoURL: profileImage,
//     });
//   } catch (error) {
//     const errorMessage = error.message;
//     console.log(errorMessage);
//   }
// };

export { createUser, addUser };

// default user image, then you need to have a call to the storage db
// with the url and get the information back
