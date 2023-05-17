import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContext";
import { Link, useLocation } from "react-router-dom";
import { getAllCurrentUserPosts } from "../../../firebase/posts";
import FeedPosts from "../../post/components/FeedPosts";

const ProfileFeed = () => {
  const { rerender } = useContext(UserContext);

  const userIDArray = window.location.href.split("/");
  const userID = userIDArray[userIDArray.length - 1];

  let [userPosts, setUserPosts] = useState([]);

  const generateUserPosts = async () => {
    try {
      const posts = await getAllCurrentUserPosts(userID);
      let allPosts = posts.map((post) => (
        <div
          to={`/post/${post.post.id}`}
          className="post-link"
          data-post-id={post.post.id}
          key={post.post.createTimeExtended}
          data-user-id={post.uniqueID}
        >
          <FeedPosts post={post} userID={userID} />
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
    generateUserPosts();
  }, [rerender]);

  return <div className="feed-list-container">{userPosts}</div>;
};

export default ProfileFeed;
