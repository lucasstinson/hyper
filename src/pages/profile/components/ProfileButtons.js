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

const ProfileButtons = () => {
  // context hook to grab current user data
  const { currentUser, rerender, setRerender } = useContext(UserContext);

  // Variables used to get unique ID of current profile based on URL.
  const profileIDArray = window.location.href.split("/");
  const profileID = profileIDArray[profileIDArray.length - 1];

  // Initial follow status on profile.
  const [followStatus, setFollowStatus] = useState(false);

  // Initial follow button text.
  const [followButton, setFollowButton] = useState("Follow");

  // Funtion that gets amount of followers, finds if currentLogged
  // in user follows and updates the follow status and button text.
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

  // updates Follow button color based on if the current user is
  // logged in and follows user.
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

  // handles click of follow button. When clicked, depending on
  // if the current logged in user follows another user they will
  // unfollow or follow and the status, button text and color updates
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

  // clicking the message button will either find the current
  // direct message with that user or create a chat room to message.
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

  // gets the follow status if a user is logged in
  useEffect(() => {
    if (currentUser) {
      handleFollow(profileID);
    }
  }, [currentUser]);

  // updates the color based on the follow status if the status updates
  // or the page is being rerendered.
  useEffect(() => {
    if (currentUser) {
      updateColor();
    }
  }, [followStatus, rerender]);

  // The buttons that appear are based on if a user is logged in
  // or logged out,  and if it is current logged in users profile.
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
