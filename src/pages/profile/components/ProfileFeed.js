import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContext";
import { Link } from "react-router-dom";
import { logOut } from "../../../firebase/profile";
import userWhite from "../../../assets/images/user-white.png";
import repostGray from "../../../assets/images/repost-gray.png";
import repostGreen from "../../../assets/images/repost-green.png";
import heartGray from "../../../assets/images/heart-gray.png";
import heartGreen from "../../../assets/images/heart-green.png";
import shareGray from "../../../assets/images/share-gray.png";
import shareGeen from "../../../assets/images/share-gray.png";
import { getAllCurrentUserPosts } from "../../../firebase/post";
const ProfileFeed = () => {
  const { name, bio, photoURL, username } = useContext(UserContext);

  let [userPosts, setUserPosts] = useState([]);

  const generateUserPosts = async () => {
    try {
      const posts = await getAllCurrentUserPosts();
      let allPosts = posts.map((post) => (
        <div className="feed-post-container" key={post.createTimeExtended}>
          <div className="feed-post-user-container">
            <img src={photoURL} className="feed-post-user" alt="user pic"></img>
          </div>
          <div className="feed-post-info-container">
            <div className="feed-post-info">
              <div className="feed-post-name">
                {name} <span className="feed-post-username">{username}</span>
              </div>
              <div className="feed-post-time">{post.createDate}</div>
            </div>
            <div className="feed-post">{post.text}</div>
            <div className="feed-post-actions-container">
              <div className="repost-container">
                <img
                  src={repostGray}
                  className="repost-icon"
                  alt="repost"
                ></img>
                <div className="repost-count">{post.Likes.length}</div>
              </div>
              <div className="like-container">
                <img src={heartGray} className="heart-icon" alt="like"></img>
                <div className="like-count">{post.Reposts.length}</div>
              </div>
              <div className="share-container">
                <img src={shareGray} className="share-icon" alt="share"></img>
              </div>
            </div>
          </div>
        </div>
      ));
      setUserPosts(allPosts);
    } catch (error) {
      const errorMessage = error.message;
    }
  };

  useEffect(() => {
    generateUserPosts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      generateUserPosts();
    }, [5000]);
  });

  return <div className="feed-list-container">{userPosts}</div>;
};

export default ProfileFeed;
