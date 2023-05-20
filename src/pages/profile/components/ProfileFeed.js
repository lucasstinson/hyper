import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContext";
import { getAllCurrentUserPosts } from "../../../firebase/posts";
import FeedPosts from "../../post/components/FeedPosts";

const ProfileFeed = () => {
  // context hook to grab rerender flag
  const { rerender } = useContext(UserContext);

  // variables used to capture a user's unique ID, used in rendering.
  const userIDArray = window.location.href.split("/");
  const userID = userIDArray[userIDArray.length - 1];

  // Initial varibale of posts related to currently viewed profile
  let [userPosts, setUserPosts] = useState([]);

  // gets all users posts and maps the JSX based on each post
  // then sets the state variable to the mapped posts.
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

  // on mount generates users posts
  useEffect(() => {
    generateUserPosts();
  }, []);

  // if rerender variable changes rerender the users posts
  useEffect(() => {
    generateUserPosts();
  }, [rerender]);

  return <div className="feed-list-container">{userPosts}</div>;
};

export default ProfileFeed;
