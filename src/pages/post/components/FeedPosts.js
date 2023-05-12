import React, { useState } from "react";
import { Link } from "react-router-dom";
import userWhite from "../../../assets/images/user-white.png";
import repostGray from "../../../assets/images/repost-gray.png";
import repostGreen from "../../../assets/images/repost-green.png";

import shareGray from "../../../assets/images/share-gray.png";
import shareGreen from "../../../assets/images/share-green.png";
import Likes from "./Likes";
import Replies from "./Replies";

const FeedPosts = (props) => {
  const { post } = props;

  const [visibility, setVisibility] = useState("hidden");

  const handleClick = (e) => {
    const toolTip = e.target.nextSibling;
    const postLink = `https://lucasstinson.github.io/hyper/#/post/${post.post.id}`;
    navigator.clipboard.writeText(postLink);
    toolTip.textContent = "Copied to Clipboard";
    setVisibility("visible");

    setTimeout(() => {
      setVisibility("hidden");
      toolTip.textContent = "Copy to Clipboard";
    }, 2000);
  };

  return (
    <div className="feed-post-container">
      <div className="feed-post-user-container">
        <Link
          to={`/profile/${post.uniqueID}`}
          state={{ uid: post.uniqueID }}
          className="post-link"
        >
          <img src={post.photoURL} className="feed-post-user" alt=""></img>
        </Link>
      </div>
      <div className="feed-post-info-container">
        <Link
          to={`/post/${post.post.id}`}
          state={{ uid: post.uniqueID }}
          className="feed-post-info-link"
          data-post-id={post.post.id}
          key={post.post.createTimeExtended}
          data-user-id={post.uniqueID}
        >
          <div className="feed-post-info">
            <Link
              to={`/profile/${post.uniqueID}`}
              state={{ uid: post.uniqueID }}
              className="post-link"
            >
              <div className="feed-post-name">
                {post.name}{" "}
                <span className="feed-post-username">{post.username}</span>
              </div>
            </Link>
            <div className="feed-post-time">{post.post.createDate}</div>
          </div>
          <div className="feed-post">{post.post.text}</div>
        </Link>
        <div className="feed-post-actions-container">
          {/* <div className="repost-container">
            <img src={repostGray} className="repost-icon" alt="repost"></img>
            <div className="repost-count">{post.post.Reposts.length}</div>
          </div> */}
          <Replies post={post} />
          <Likes post={post} />
          <div
            className="share-container"
            onMouseOver={(e) => setVisibility("visible")}
            onMouseLeave={(e) => setVisibility("hidden")}
          >
            <img
              src={shareGray}
              className="share-icon"
              alt="share"
              onClick={(e) => handleClick(e)}
              onMouseOver={(e) => (e.currentTarget.src = shareGreen)}
              onMouseLeave={(e) => (e.currentTarget.src = shareGray)}
            ></img>
            <span style={{ visibility: visibility }} className="tool-tip-text">
              Copy to Clipboard
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPosts;
