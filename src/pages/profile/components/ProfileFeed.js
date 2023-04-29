import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContext";
import { Link, useLocation } from "react-router-dom";
import { getAllCurrentUserPosts } from "../../../firebase/posts";
import FeedPosts from "./FeedPosts";

const ProfileFeed = () => {
  const { rerender } = useContext(UserContext);

  const location = useLocation();
  const userID = window.location.href.split("/")[5];
  let [userPosts, setUserPosts] = useState([]);

  const generateUserPosts = async () => {
    try {
      const posts = await getAllCurrentUserPosts(userID);
      let allPosts = posts.map((post) => (
        <Link
          to={`/post/${post.post.id}`}
          state={{ uid: post.uniqueID }}
          className="post-link"
          data-post-id={post.post.id}
          key={post.post.createTimeExtended}
          data-user-id={post.uniqueID}
        >
          <FeedPosts post={post} userID={userID} />
        </Link>
      ));
      setUserPosts(allPosts);
    } catch (error) {
      const errorMessage = error.message;
    }
  };

  useEffect(() => {
    generateUserPosts();
  }, [userID, rerender]);

  return <div className="feed-list-container">{userPosts}</div>;
};

export default ProfileFeed;
