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
import { useAuth } from "../../firebase/firebase";
import { logOut } from "../../firebase/profile";
import { UserContext } from "../../UserContext";

const Profile = () => {
  const { currentUser, name, bio, photoURL, username } =
    useContext(UserContext);

  return (
    <div className="Profile">
      <div className="profile-page-container">
        <div className="profile-container">
          <div className="profile-info-container">
            <img
              src={photoURL}
              className="profile-image"
              alt="profile pic"
            ></img>
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
        <div className="feed-list-container">
          <div className="feed-post-container">
            <div className="feed-post-user-container">
              <img
                src={userWhite}
                className="feed-post-user"
                alt="user pic"
              ></img>
            </div>
            <div className="feed-post-info-container">
              <div className="feed-post-info">
                <div className="feed-post-name">
                  user's name{" "}
                  <span className="feed-post-username">@user_name</span>
                </div>
                <div className="feed-post-time">Aug 12, 2022</div>
              </div>
              <div className="feed-post">
                This is going to be limited to 200 characters as to properly
                test the posts and adding to get 200...
              </div>
              <div className="feed-post-actions-container">
                <div className="repost-container">
                  <img
                    src={repostGray}
                    className="repost-icon"
                    alt="repost"
                  ></img>
                  <div className="repost-count">10</div>
                </div>
                <div className="like-container">
                  <img src={heartGray} className="heart-icon" alt="like"></img>
                  <div className="like-count">17</div>
                </div>
                <div className="share-container">
                  <img src={shareGray} className="share-icon" alt="share"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
