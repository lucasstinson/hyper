import React, { useState } from "react";
import replyGray from "../../../assets/images/reply-gray.png";
import replyGreen from "../../../assets/images/reply-green.png";
import { Link } from "react-router-dom";

const Replies = (props) => {
  const { post } = props;

  const [replyEmoji, setReplyEmoji] = useState(replyGray);

  return (
    <Link
      to={`/post/${post.post.id}`}
      state={{ uid: post.uniqueID }}
      className="reply-container"
    >
      <img
        src={replyEmoji}
        className="reply-icon"
        alt=""
        onMouseOver={(e) => (e.currentTarget.src = replyGreen)}
        onMouseLeave={(e) => (e.currentTarget.src = replyEmoji)}
      ></img>
      <div className="reply-count">{post.post.Replies.length}</div>
    </Link>
  );
};

export default Replies;
