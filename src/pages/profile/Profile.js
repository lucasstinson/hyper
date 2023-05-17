import React from "react";
import "./profile.css";
import ProfileFeed from "./components/ProfileFeed";
import ProfileInfo from "./components/ProfileInfo";

const Profile = () => {
  return (
    <div className="Profile">
      <div className="profile-page-container">
        <ProfileInfo />
        <ProfileFeed />
      </div>
    </div>
  );
};

export default Profile;
