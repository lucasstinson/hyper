import { auth, db } from "./firebase";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// gets all Profile data related to a user
const getProfileData = async (userID) => {
  const docRef = doc(db, "users", userID);
  try {
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    return userData;
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};

// gets PhotoURL for profile
const getURL = async (photo) => {
  const fileName = photo;
  const imageRef = ref(storage, fileName);
  const image = await getDownloadURL(imageRef);
  return image;
};

// Storage

// updates the storage with the users image
// and adds photo to users profile
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

// helper function that updates the URL with a users profile image.
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

// updates the users settings and alerts the user when completed.
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

export { getProfileData, getURL, upload, updateSettings };
