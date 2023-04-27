import React, { useContext } from "react";
import { UserContext } from "../../../UserContext";
import { Link } from "react-router-dom";
import { logOut } from "../../../firebase/profile";

const ProfileInfo = () => {
  const { currentUser, name, bio, photoURL, username } =
    useContext(UserContext);

  return (
    <div className="profile-container">
      <div className="profile-info-container">
        <img src={photoURL} className="profile-image" alt="profile pic"></img>
        <div className="profile-data">
          <div className="profile-usersname">{name}</div>
          <div className="profile-username">{username}</div>
          <div className="bio-container">
            <div className="bio-text">{bio}</div>
          </div>
          <div className="follow-container">
            <div className="following-container">
              <div className="following-count">149</div>
              <div className="following-text">Following</div>
            </div>
            <div className="followers-container">
              <div className="followers-count">66</div>
              <div className="followers-text">Followers</div>
            </div>
          </div>
        </div>
      </div>
      {currentUser && (
        <div className="edit-profile-container">
          <Link to="/profile/settings">
            <button className="edit-profile-button">Edit Profile</button>
          </Link>
          <Link to="/">
            <button className="log-out-button" onClick={logOut}>
              Log Out
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
