import React, { useContext } from "react";
import { UserContext } from "../../../UserContext";
import { Link } from "react-router-dom";
import { logOut } from "../../../firebase/profile";

const ProfileButtons = () => {
  const { currentUser } = useContext(UserContext);
  const userID = window.location.href.split("/")[5];

  if (currentUser) {
    if (userID == currentUser.uid) {
      return (
        <div className="profile-button-container">
          <Link to={`/profile/${userID}/settings`}>
            <button className="edit-profile-button">Edit Profile</button>
          </Link>
          <Link to="/feed">
            <button className="log-out-button" onClick={logOut}>
              Log Out
            </button>
          </Link>
        </div>
      );
    } else if (userID != currentUser.uid) {
      return (
        <div className="profile-button-container">
          <Link to={"/messages"}>
            <button className="message-profile-button">Message</button>
          </Link>
          <Link to="/feed">
            <button className="follow-button">Follow</button>
          </Link>
        </div>
      );
    }
  } else {
    return (
      <div className="profile-button-container">
        {/* <Link to={"/messages"}>
      <button className="message-profile-button">Message</button>
    </Link>
    <Link to="/">
      <button className="follow-button">Follow</button>
    </Link> */}
      </div>
    );
  }

  {
    /* {currentUser && (
        <div className="edit-profile-container">
          <Link to={`/profile/${userID}/settings`}>
            <button className="edit-profile-button">Edit Profile</button>
          </Link>
          <Link to="/">
            <button className="log-out-button" onClick={logOut}>
              Log Out
            </button>
          </Link>
        </div>
      )} */
  }
};

export default ProfileButtons;
