import React, { useState, useEffect, useContext } from "react";
import PostComment from "./PostComment";
import { createPortal } from "react-dom";
import { UserContext } from "../../../UserContext";
import { Link } from "react-router-dom";

const AddComment = (props) => {
  // context hook to current logged in user info.
  const { currentUser } = useContext(UserContext);

  // state variables of post
  const { post } = props;

  // Initial flag on whether to show a comment modal
  const [showPost, setShowPost] = useState(false);

  // If the current user is logged in, allow the user to add a comment.
  // else the user will be ased to log in
  if (currentUser) {
    return (
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
    );
  } else {
    return (
      <div className="add-comment-container">
        <Link to={"/login"}>
          <button className="add-comment">+ Add a Comment</button>
        </Link>
      </div>
    );
  }
};

export default AddComment;
