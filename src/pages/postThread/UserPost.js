import React, { useContext, useEffect, useState } from "react";
import "./userpost.css";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { postThread } from "../../firebase/posts";
import FeedPosts from "../post/components/FeedPosts";
import Comments from "./components/Comments";
import PostComment from "./components/PostComment";
import { UserContext } from "../../UserContext";

const UserPost = (props) => {
  const { rerender } = useContext(UserContext);
  const location = useLocation();
  const postID = window.location.href.split("/")[5];
  const userID = location.state.uid;

  const [userPost, setUserPost] = useState([]);
  const [showPost, setShowPost] = useState(false);

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
          <div className="add-comment-container">
            <button className="add-comment" onClick={() => setShowPost(true)}>
              + Add a Comment
            </button>
            {showPost &&
              createPortal(
                <PostComment onClose={() => setShowPost(false)} post={post} />,
                document.querySelector(".App")
              )}
          </div>
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
  }, [showPost, rerender]);

  return (
    <div className="Feed">
      <div className="feed-container">
        <div className="feed-list-container">{userPost}</div>
      </div>
    </div>
  );
};

export default UserPost;
