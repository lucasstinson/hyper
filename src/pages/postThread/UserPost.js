import React, { useContext, useEffect, useState } from "react";
import "./userpost.css";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { postThread } from "../../firebase/posts";
import FeedPosts from "../post/components/FeedPosts";
import Comments from "./components/Comments";
import PostComment from "./components/PostComment";
import { UserContext } from "../../UserContext";
import { createUser } from "../../firebase/signup";
import AddComment from "./components/AddComment";

const UserPost = (props) => {
  const { rerender, currentUser } = useContext(UserContext);
  const location = useLocation();

  // local routing
  // const postID = window.location.href.split("/")[5];

  // github/hasrouter routing
  const postID = window.location.href.split("/")[6];

  const userID = location.state.uid;

  const [userPost, setUserPost] = useState([]);
  const generatePostThread = async () => {
    try {
      const postData = await postThread(userID, postID);
      let thread = postData.map((post) => (
        <div
          to={`/post/${post.post.id}`}
          className="post-link"
          data-post-id={post.post.id}
          key={post.post.createTimeExtended}
          data-user-id={post.uniqueID}
        >
          <FeedPosts post={post} userID={post.uniqueID} />
          <Comments post={post} userID={userID} postID={postID} />
          <AddComment post={post} />
        </div>
      ));
      setUserPost(thread);
    } catch (error) {
      const errorMessage = error.errorMessage;
    }
  };

  useEffect(() => {
    generatePostThread();
  }, []);

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
