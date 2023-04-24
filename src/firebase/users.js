import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { storage } from "./firebase";
import { ref, getDownloadURL } from "firebase/storage";

const getProfileData = async () => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  try {
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    return userData;
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};

const getURL = async (photo) => {
  const fileName = photo;
  const imageRef = ref(storage, fileName);
  const image = await getDownloadURL(imageRef);
  console.log(image);
  return image;
};
export { getProfileData, getURL };
