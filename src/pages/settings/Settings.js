import React from "react";
import "./settings.css";
import { Link } from "react-router-dom";
import camera from "../../assets/images/camera.png";
import userWhite from "../../assets/images/user-white.png";

const Settings = () => {
  return (
    <div className="Settings">
      <div className="settings-container">
        <div className="settings-title-container">
          <div className="settings-title">Edit Profile</div>
        </div>
        <div className="settings-info-container">
          <div className="settings-profile-image-container">
            <img
              src={userWhite}
              className="settings-profile-image"
              alt="profile pic"
            ></img>
            <img src={camera} className="add-photo-image" alt="add pic"></img>
          </div>
          <div className="settings-profile-data">
            <div className="settings-user-name-container">
              <div className="settings-users-name">Name:</div>
              <input
                className="settings-profile-usersname"
                defaultValue="User's Name"
              ></input>
            </div>
            <div className="settings-bio-container">
              <div className="settings-users-bio">Bio:</div>
              <input
                className="settings-bio-text"
                defaultValue="This is my Bio and I am who I am and this will only be allowed
              80 character count"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

// user is able to edit Picture, Name and Bio
