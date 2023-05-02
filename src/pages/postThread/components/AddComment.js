import React, { useState, useEffect, useContext } from "react";
import PostComment from "./PostComment";
import { createPortal } from "react-dom";
import { UserContext } from "../../../UserContext";

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
    return;
  }
};

export default AddComment;
