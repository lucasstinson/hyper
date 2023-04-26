import React, { useContext, useEffect, useState } from "react";
import "./settings.css";
import { upload } from "../../firebase/firebase";
import camera from "../../assets/images/camera.png";
import userWhite from "../../assets/images/user-white.png";
import { updateSettings } from "../../firebase/firebase";
import { UserContext } from "../../UserContext";

const Settings = () => {
  const { currentUser, name, setName, bio, setBio, photoURL, setPhotoURL } =
    useContext(UserContext);

  // character count for each respective setting
  const [nameCharacters, setNameCharacters] = useState(0);
  const [bioCharacters, setBioCharacters] = useState(0);

  // initializes photo handling and seeing image prior to save
  const [photo, setPhoto] = useState(null);
  const [tempPhoto, setTempPhoto] = useState(photoURL);

  // sets the photo to be shown as a preview
  const setFilePreview = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setTempPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  // save, if a new photo is added update/uplaod, always update name/bio
  const saveSettings = () => {
    if (photo) {
      setPhotoURL(photo);
      upload(photo, currentUser);
    }
    updateSettings();
    setName(document.querySelector(".settings-profile-usersname").value);
    setBio(document.querySelector(".settings-users-bio").value);
  };

  // due to async, photoURL isnt loaded immediately and needs to be set
  useEffect(() => {
    setTempPhoto(photoURL);
  }, [photoURL]);

  // set character count on initial render
  useEffect(() => {
    setBioCharacters(bio.length);
    setNameCharacters(name.length);
  }, []);

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
                title="Add photo"
                alt=""
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
              <div className="name-text-container">
                <textarea
                  type="text"
                  className="settings-profile-usersname"
                  placeholder="User Nickname"
                  defaultValue={name}
                  maxLength={12}
                  onChange={(e) => setNameCharacters(e.target.value.length)}
                ></textarea>
                <div className="name-character-count">
                  {nameCharacters} / 12
                </div>
              </div>
            </div>
            <div className="settings-bio-container">
              <div className="settings-users-bio">Bio:</div>
              <div className="bio-text-container">
                <textarea
                  type="text"
                  className="settings-bio-text"
                  placeholder="Tell us about you"
                  defaultValue={bio}
                  maxLength={80}
                  onChange={(e) => setBioCharacters(e.target.value.length)}
                ></textarea>
                <div className="bio-character-count">{bioCharacters} / 80</div>
              </div>
            </div>
            <div className="save-profile-container">
              <button className="save-profile-button" onClick={saveSettings}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* {userSettings} */}
    </div>
  );
};

export default Settings;

// user is able to edit Picture, Name and Bio

// https://www.youtube.com/watch?v=9uYTQJEMj8I

// if user has an photoURL, display that
// if not, display userWhite
// if user updates, photo, display photo, but dont display photoURL again
