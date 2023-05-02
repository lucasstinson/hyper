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
import { getAllPosts } from "../../firebase/posts";
import { Link } from "react-router-dom";
import FeedPosts from "../post/components/FeedPosts";

const Feed = () => {
  const [userPosts, setUserPosts] = useState([]);

  const generateAllPosts = async () => {
    try {
      const posts = await getAllPosts();
      posts.sort((a, b) => {
        let aTime = a.post.createTimeExtended;
        let bTime = b.post.createTimeExtended;
        if (aTime < bTime) return 1;
        if (aTime > bTime) return -1;
        return 0;
      });
      let allPosts = posts.map((post) => (
        <div
          to={`/post/${post.post.id}`}
          className="post-link"
          data-post-id={post.post.id}
          key={post.post.createTimeExtended}
          data-user-id={post.uniqueID}
        >
          <FeedPosts post={post} userID={post.uniqueID} />
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
    }, [500]);
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
