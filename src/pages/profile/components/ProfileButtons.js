import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContext";
import { Link } from "react-router-dom";
import { logOut } from "../../../firebase/profile";
import {
  addfollower,
  getFollowers,
  deletefollower,
} from "../../../firebase/followers";
import { findConversation } from "../../../firebase/messages";
import { async } from "@firebase/util";

const ProfileButtons = () => {
  const { currentUser, rerender, setRerender } = useContext(UserContext);
  const profileIDArray = window.location.href.split("/");
  const profileID = profileIDArray[profileIDArray.length - 1];
  const [followStatus, setFollowStatus] = useState(false);
  const [followButton, setFollowButton] = useState("Follow");
  const [conversationID, setConversationID] = useState("");

  const handleFollow = async (profileID) => {
    try {
      const IDs = await getFollowers(profileID);
      if (IDs.includes(currentUser.uid)) {
        setFollowStatus(true);
        setFollowButton("Unfollow");
      } else {
        setFollowStatus(false);
        setFollowButton("Follow");
      }
    } catch (error) {
      const errorMessage = error.message;
    }
  };
  const updateColor = () => {
    if (profileID != currentUser.uid) {
      const followElement = document.querySelector(".follow-button");
      if (followStatus) {
        followElement.style.background = "#222629";
        followElement.style.color = "white";
      } else {
        followElement.style.background = "white";
        followElement.style.color = "#222629";
      }
    }
  };

  const handleClick = () => {
    if (followStatus) {
      deletefollower(profileID, currentUser.uid);
      setFollowStatus(false);
      setFollowButton("Follow");
      updateColor();
    } else {
      addfollower(profileID, currentUser.uid);
      setFollowStatus(true);
      setFollowButton("Unfollow");
      updateColor();
    }
    setRerender(!rerender);
  };

  const messageClick = async () => {
    try {
      const conversationUID = await findConversation(
        currentUser.uid,
        profileID
      );
      window.location.href = `#/messages/${conversationUID}`;
    } catch (error) {
      const errorMessage = error.message;
    }
  };

  useEffect(() => {
    if (currentUser) {
      handleFollow(profileID);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      updateColor();
    }
  }, [followStatus, rerender]);

  if (currentUser) {
    if (profileID == currentUser.uid) {
      return (
        <div className="profile-button-container">
          <Link to={`/profile/${profileID}/settings`}>
            <button className="edit-profile-button">Edit Profile</button>
          </Link>
          <Link to="/">
            <button className="log-out-button" onClick={logOut}>
              Log Out
            </button>
          </Link>
        </div>
      );
    } else if (profileID != currentUser.uid) {
      return (
        <div className="profile-button-container">
          <button
            className="message-profile-button"
            onClick={() => messageClick()}
          >
            Message
          </button>
          <button className="follow-button" onClick={handleClick}>
            {followButton}
          </button>
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
};

export default ProfileButtons;
