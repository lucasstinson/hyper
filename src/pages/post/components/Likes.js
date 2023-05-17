import React, { useContext, useEffect, useState } from "react";
import heartGray from "../../../assets/images/heart-gray.png";
import heartGreen from "../../../assets/images/heart-green.png";
import { UserContext } from "../../../UserContext";
import { addLike, deleteLike } from "../../../firebase/likes";
import { Link } from "react-router-dom";

const Likes = (props) => {
  const { currentUser, name } = useContext(UserContext);
  const { post } = props;
  let usersID = post.uniqueID;
  let usersPostID = post.post.id;
  let currentUserID = "";
  if (currentUser) {
    currentUserID = currentUser.uid;
  }

  const [likes, setLikes] = useState(post.post.Likes.length);

  const [heartEmoji, setHeartEmoji] = useState(heartGray);

  const [userLikeStatus, setUserLikeStatus] = useState("");

  const likeIDs = () => {
    let IDs = [];
    for (let i = 0; i < post.post.Likes.length; i++) {
      IDs.push(post.post.Likes[i].uniqueID);
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
      deleteLike(usersID, usersPostID, currentUserID);
    } else {
      setLikes(likes + 1);
      setHeartEmoji(heartGreen);
      setUserLikeStatus(!userLikeStatus);
      addLike(usersID, usersPostID, currentUserID);
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

export default Likes;