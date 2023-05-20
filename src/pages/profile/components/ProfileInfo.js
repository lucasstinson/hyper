import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../UserContext";
import userWhite from "../../../assets/images/user-white.png";
import ProfileButtons from "./ProfileButtons";
import { getProfileData } from "../../../firebase/users";
import { useAuth } from "../../../firebase/firebase";
import { getFollowers } from "../../../firebase/followers";

const ProfileInfo = () => {
  // context hook to grab current user data
  const { bio, name, photoURL, username, rerender } = useContext(UserContext);

  // check if the current user is logged in | logged out
  const currentUser = useAuth();

  // Variables used to get unique ID of current profile based on URL.
  const userIDArray = window.location.href.split("/");
  const userID = userIDArray[userIDArray.length - 1];

  // Initial user bio on profile page
  const [userBio, setUserBio] = useState("");

  // Initial nickname on profile page
  const [userName, setUserName] = useState("");

  // Initial photo on profile page
  const [userPhotoURL, setUserPhotoURL] = useState(userWhite);

  // Initial username on profile page
  const [userUsername, setUserUserName] = useState("");

  // Initial follower count on profile page
  const [followCount, setFollowCount] = useState(0);

  // gets follower count of current profile
  const getFollowerCount = async (userID) => {
    try {
      const followers = await getFollowers(userID);
      setFollowCount(followers.length);
    } catch (error) {
      const errorMessage = error.message;
    }
  };

  // run get follower count, when follow count state or user id changes
  useEffect(() => {
    getFollowerCount(userID);
  }, [followCount, userID]);

  // rrerender follower count on update
  useEffect(() => {
    setTimeout(() => {
      getFollowerCount(userID);
    }, [200]);
  }, [rerender]);

  // load the current date related to current profile being viewed
  // will update each time the current user or user ID
  useEffect(() => {
    setTimeout(() => {
      let loadCurrentUser = async () => {
        try {
          if (currentUser) {
            let currentUserID = await currentUser.uid;
            if (userID == currentUserID) {
              setUserPhotoURL(photoURL);
              setUserBio(bio);
              setUserName(name);
              setUserUserName(username);
            } else {
              const loadProfileData = async () => {
                const profileData = await getProfileData(userID);
                setUserPhotoURL(profileData.photoURL);
                setUserBio(profileData.bio);
                setUserName(profileData.name);
                setUserUserName(profileData.username);
              };
              loadProfileData();
            }
          } else {
            const loadProfileData = async () => {
              const profileData = await getProfileData(userID);
              setUserPhotoURL(profileData.photoURL);
              setUserBio(profileData.bio);
              setUserName(profileData.name);
              setUserUserName(profileData.username);
            };
            loadProfileData();
          }
        } catch (error) {
          const errorMessage = error.message;
        }
      };
      loadCurrentUser();
    });
  }, [currentUser, userID]);

  return (
    <div className="profile-container">
      <div className="profile-info-container">
        <img
          src={userPhotoURL}
          className="profile-image"
          alt="profile pic"
        ></img>
        <div className="profile-data">
          <div className="profile-usersname">{userName}</div>
          <div className="profile-username">{userUsername}</div>
          <div className="bio-container">
            <div className="bio-text">{userBio}</div>
          </div>
          <div className="follow-container">
            <div className="followers-container">
              <div className="followers-count">{followCount}</div>
              <div className="followers-text">Followers</div>
            </div>
          </div>
        </div>
      </div>
      <ProfileButtons />
    </div>
  );
};

export default ProfileInfo;
