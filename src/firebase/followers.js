import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

// adds follower to firebase for currently viewed profile
const addfollower = async (profileID, userID) => {
  const userRef = doc(db, "/users", profileID);

  const timestampExtended = new Date().toISOString().split("T").join(" ");

  const follower = {
    timestampExtended: timestampExtended,
    uniqueID: userID,
    Read: false,
  };
  try {
    const getData = await getDoc(userRef);
    const followers = getData.data().followers;
    followers.push(follower);

    const followUpdate = await updateDoc(userRef, { followers: followers });
  } catch (error) {
    const errorMessage = error.message;
  }
};

// removes follower from firebase for currently viewed profile
const deletefollower = async (profileID, userID) => {
  const userRef = doc(db, "/users", profileID);

  let newFollowers = [];
  try {
    const getData = await getDoc(userRef);
    const followers = getData.data().followers;
    for (let i = 0; i < followers.length; i++) {
      if (followers[i].uniqueID != userID) {
        newFollowers.push(followers[i]);
      }
    }

    const followUpdate = await updateDoc(userRef, { followers: newFollowers });
  } catch (error) {
    const errorMessage = error.message;
  }
};

// gets followers IDs of currently viewed profile
const getFollowers = async (profileID) => {
  const userRef = doc(db, "/users", profileID);

  let followerIDs = [];

  try {
    const getData = await getDoc(userRef);
    const followers = getData.data().followers;
    for (let i = 0; i < followers.length; i++) {
      followerIDs.push(followers[i].uniqueID);
    }
    return followerIDs;
  } catch (error) {
    const errorMessage = error.message;
  }
};

export { addfollower, getFollowers, deletefollower };
