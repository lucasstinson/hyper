import React, { useState, useContext, useEffect } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import "./profile.css";
import userWhite from "../../assets/images/user-white.png";
import repostGray from "../../assets/images/repost-gray.png";
import repostGreen from "../../assets/images/repost-green.png";
import heartGray from "../../assets/images/heart-gray.png";
import heartGreen from "../../assets/images/heart-green.png";
import shareGray from "../../assets/images/share-gray.png";
import shareGeen from "../../assets/images/share-gray.png";
import { logOut } from "../../firebase/profile";
import { UserContext } from "../../UserContext";
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
