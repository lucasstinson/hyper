import React, { useState, useEffect, useContext } from "react";
import PostComment from "./PostComment";
import { createPortal } from "react-dom";
import { UserContext } from "../../../UserContext";
import { Link } from "react-router-dom";

const AddComment = (props) => {
  const { currentUser } = useContext(UserContext);
  const { post } = props;
  const [showPost, setShowPost] = useState(false);
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
