import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import userWhite from "../../assets/images/user-white.png";
import "./feed.css";
import repostGray from "../../assets/images/repost-gray.png";
import repostGreen from "../../assets/images/repost-green.png";
import heartGray from "../../assets/images/heart-gray.png";
import heartGreen from "../../assets/images/heart-green.png";
import shareGray from "../../assets/images/share-gray.png";
import shareGeen from "../../assets/images/share-gray.png";
import { getAllPosts } from "../../firebase/post";

const Feed = () => {
  const [userPosts, setUserPosts] = useState([]);

  const generateAllPosts = async () => {
    try {
      const posts = await getAllPosts();
      let allPosts = posts.map((post) => (
        <div className="feed-post-container" key={post.post.createTimeExtended}>
          <div className="feed-post-user-container">
            <img
              src={post.photoURL}
              className="feed-post-user"
              alt="user pic"
            ></img>
          </div>
          <div className="feed-post-info-container">
            <div className="feed-post-info">
              <div className="feed-post-name">
                {post.name}{" "}
                <span className="feed-post-username">{post.username}</span>
              </div>
              <div className="feed-post-time">{post.post.createDate}</div>
            </div>
            <div className="feed-post">{post.post.text}</div>
            <div className="feed-post-actions-container">
              <div className="repost-container">
                <img
                  src={repostGray}
                  className="repost-icon"
                  alt="repost"
                ></img>
                <div className="repost-count">{post.post.Reposts.length}</div>
              </div>
              <div className="like-container">
                <img src={heartGray} className="heart-icon" alt="like"></img>
                <div className="like-count">{post.post.Likes.length}</div>
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
    setTimeout(() => {
      generateAllPosts();
    }, [10000]);
  });
  useEffect(() => {
    setTimeout(() => {
      generateAllPosts();
    });
  }, []);

  return (
    <div className="Feed">
      <div className="feed-container">
        <div className="feed-list-container">{userPosts}</div>
      </div>
    </div>
  );
};

export default Feed;
