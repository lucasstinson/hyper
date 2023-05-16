import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../UserContext";
import { useLocation } from "react-router-dom";
import userWhite from "../../../assets/images/user-white.png";
import ProfileButtons from "./ProfileButtons";
import { getProfileData } from "../../../firebase/users";
import { useAuth } from "../../../firebase/firebase";
import { getFollowers } from "../../../firebase/followers";

const ProfileInfo = () => {
  const { bio, name, photoURL, username, rerender } = useContext(UserContext);

  const currentUser = useAuth();

  const location = useLocation();

  const userID = window.location.href.split("/")[5];

  const [userBio, setUserBio] = useState("");

  const [userName, setUserName] = useState("");

  const [userPhotoURL, setUserPhotoURL] = useState(userWhite);

  const [userUsername, setUserUserName] = useState("");

  const [followCount, setFollowCount] = useState(0);

  const getFollowerCount = async (userID) => {
    try {
      const followers = await getFollowers(userID);
      setFollowCount(followers.length);
    } catch (error) {
      const errorMessage = error.message;
    }
  };

  useEffect(() => {
    getFollowerCount(userID);
  }, [followCount, userID]);

  useEffect(() => {
    setTimeout(() => {
      getFollowerCount(userID);
    }, [200]);
  }, [rerender]);

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
    }, [[1000]]);
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
