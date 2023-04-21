import React, { useContext, useEffect, useState } from "react";
import "./settings.css";
import {
  useAuth,
  upload,
  getProfileData,
  useProfile,
} from "../../firebase/firebase";
import { Link, useRouteLoaderData } from "react-router-dom";
import camera from "../../assets/images/camera.png";
import userWhite from "../../assets/images/user-white.png";
import { updateSettings } from "../../firebase/firebase";
import { UserContext } from "../../UserContext";

const Settings = () => {
  const { currentUser, name, bio, photoURL, setPhotoURL } =
    useContext(UserContext);

  const [photo, setPhoto] = useState(null);
  const [tempPhoto, setTempPhoto] = useState(photoURL);
  // sets the photo to be shown as a preview
  const setFilePreview = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setTempPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleClick = () => {
    if (photo) {
      upload(photo, currentUser);
      setPhotoURL(photo);
    }

    updateSettings();
  };

  useEffect(() => {
    // photoPreview();
    console.log("settings");
  });

  return (
    <div className="Settings">
      <div className="settings-container">
        <div className="settings-title-container">
          <div className="settings-title">Edit Profile</div>
        </div>
        <div className="settings-info-container">
          <div className="settings-profile-image-container">
            <label htmlFor="file-upload" className="new-profile-image">
              <img
                src={tempPhoto}
                className="settings-profile-image"
                alt="profile pic"
                title="Add photo"
              ></img>
              <img
                src={camera}
                className="add-photo-image"
                alt="add pic"
                title="Add photo"
              ></img>
              <input
                type="file"
                id="file-upload"
                accept="image/png, image/jpeg, image/svg"
                onChange={setFilePreview}
              ></input>
            </label>
          </div>
          <div className="settings-profile-data">
            <div className="settings-user-name-container">
              <div className="settings-users-name">Name:</div>
              <textarea
                type="text"
                className="settings-profile-usersname"
                placeholder="User Nickname"
                defaultValue={name}
                maxLength={12}
              ></textarea>
            </div>
            <div className="settings-bio-container">
              <div className="settings-users-bio">Bio:</div>
              <textarea
                type="text"
                className="settings-bio-text"
                placeholder="Tell us about you"
                defaultValue={bio}
                maxLength={80}
              ></textarea>
            </div>
            <div className="save-profile-container">
              <button className="save-profile-button" onClick={handleClick}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

// user is able to edit Picture, Name and Bio

// https://www.youtube.com/watch?v=9uYTQJEMj8I

// if user has an photoURL, display that
// if not, display userWhite
// if user updates, photo, display photo, but dont display photoURL again
