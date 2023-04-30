import React from "react";
import { Link } from "react-router-dom";
import userWhite from "../../../assets/images/user-white.png";
import repostGray from "../../../assets/images/repost-gray.png";
import repostGreen from "../../../assets/images/repost-green.png";
import heartGray from "../../../assets/images/heart-gray.png";
import heartGreen from "../../../assets/images/heart-green.png";
import shareGray from "../../../assets/images/share-gray.png";
import shareGeen from "../../../assets/images/share-gray.png";
import Likes from "./Likes";

const FeedPosts = (props) => {
  const { post } = props;
  return (
    <div className="feed-post-container">
      <div className="feed-post-user-container">
        <Link
          to={`/profile/${post.uniqueID}`}
          state={{ uid: post.uniqueID }}
          className="post-link"
        >
          <img
            src={post.photoURL}
            className="feed-post-user"
            alt="user pic"
          ></img>
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
          <div className="repost-container">
            <img src={repostGray} className="repost-icon" alt="repost"></img>
            <div className="repost-count">{post.post.Reposts.length}</div>
          </div>
          <Likes post={post} />
          <div className="share-container">
            <img src={shareGray} className="share-icon" alt="share"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPosts;
