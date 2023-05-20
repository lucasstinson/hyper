import React, { useContext, useEffect, useState } from "react";
import "./userpost.css";
import { postThread } from "../../firebase/posts";
import FeedPosts from "../post/components/FeedPosts";
import Comments from "./components/Comments";
import { UserContext } from "../../UserContext";
import AddComment from "./components/AddComment";

const UserPost = (props) => {
  // context hook to grab rerender flag
  const { rerender } = useContext(UserContext);

  // Variables used to get unique ID of post based on URL.
  const postIDArray = window.location.href.split("/");
  const postID = postIDArray[postIDArray.length - 1];

  // Initial variable related to currently viewed post.
  const [userPost, setUserPost] = useState([]);

  // gets all current post and all comments related to post
  // sets the userPost state variable to the JSX mapped comments.
  const generatePostThread = async () => {
    try {
      const postData = await postThread(postID);
      let thread = postData.map((post) => (
        <div
          to={`/post/${post.post.id}`}
          className="post-link"
          data-post-id={post.post.id}
          key={post.post.createTimeExtended}
          data-user-id={post.uniqueID}
        >
          <FeedPosts post={post} userID={post.uniqueID} />
          <Comments post={post} userID={post.uniqueID} postID={postID} />
          <AddComment post={post} />
        </div>
      ));
      setUserPost(thread);
    } catch (error) {
      const errorMessage = error.errorMessage;
    }
  };

  // renders thread on mount
  useEffect(() => {
    generatePostThread();
  }, []);

  // On rerender change, rerenders thread
  useEffect(() => {
    generatePostThread();
  }, [rerender]);

  return (
    <div className="Feed">
      <div className="feed-container">
        <div className="feed-list-container">{userPost}</div>
      </div>
    </div>
  );
};

export default UserPost;
