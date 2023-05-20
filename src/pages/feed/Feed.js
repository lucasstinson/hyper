import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";

import "./feed.css";
import { getAllPosts } from "../../firebase/posts";
import FeedPosts from "../post/components/FeedPosts";

const Feed = () => {
  // context hook to grab rerender flag
  const { rerender } = useContext(UserContext);

  // Initial varibale of all posts
  const [userPosts, setUserPosts] = useState([]);

  // gets all posts made, sorts them and then maps
  // them to the userPosts varaible
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

  // upon rerender flag change, generates posts after 1 sec delay.
  useEffect(() => {
    setTimeout(() => {
      generateAllPosts();
    }, [1000]);
  }, [rerender]);

  // On Mount, generates posts after 1 sec delay.
  useEffect(() => {
    setTimeout(() => {
      generateAllPosts();
    }, [1000]);
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
