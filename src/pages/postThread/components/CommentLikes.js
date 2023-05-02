import React, { useContext, useEffect, useState } from "react";
import heartGray from "../../../assets/images/heart-gray.png";
import heartGreen from "../../../assets/images/heart-green.png";
import { UserContext } from "../../../UserContext";
import { Link } from "react-router-dom";
import { addCommentLike, deleteCommentLike } from "../../../firebase/likes";

const CommentLikes = (props) => {
  const { currentUser } = useContext(UserContext);
  const { post, uid, usersPostID, postID } = props;
  let uniqueTimeStamp = uid;
  let usersID = post.uniqueID;
  let currentUserID = "";
  if (currentUser) {
    currentUserID = currentUser.uid;
  }

  const [likes, setLikes] = useState(post.Likes.length);

  const [heartEmoji, setHeartEmoji] = useState(heartGray);

  const [userLikeStatus, setUserLikeStatus] = useState("");

  const likeIDs = () => {
    let IDs = [];
    for (let i = 0; i < post.Likes.length; i++) {
      IDs.push(post.Likes[i].uniqueID);
    }
    return IDs;
  };

  const handleEmoji = () => {
    if (likeIDs().includes(currentUserID)) {
      setHeartEmoji(heartGreen);
      setUserLikeStatus(true);
    } else {
      setHeartEmoji(heartGray);
      setUserLikeStatus(false);
    }
  };

  const handleClick = (e) => {
    if (userLikeStatus) {
      setLikes(likes - 1);
      setHeartEmoji(heartGray);
      setUserLikeStatus(!userLikeStatus);
      deleteCommentLike(usersPostID, postID, currentUserID, uniqueTimeStamp);
    } else {
      setLikes(likes + 1);
      setHeartEmoji(heartGreen);
      setUserLikeStatus(!userLikeStatus);
      addCommentLike(usersPostID, postID, currentUserID, uniqueTimeStamp);
    }
  };

  useEffect(() => {
    if (currentUser) {
      likeIDs();
      handleEmoji();
    }
  }, []);

  if (currentUser) {
    return (
      <div
        className="like-container"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <img
          src={heartEmoji}
          className="heart-icon"
          alt=""
          onMouseOver={(e) => (e.currentTarget.src = heartGreen)}
          onMouseLeave={(e) => (e.currentTarget.src = heartEmoji)}
        ></img>
        <div className="like-count">{likes}</div>
      </div>
    );
  } else {
    return (
      <Link to={"/login"} className="like-container">
        <img src={heartEmoji} className="heart-icon" alt=""></img>
        <div className="like-count">{likes}</div>
      </Link>
    );
  }
};

export default CommentLikes;
