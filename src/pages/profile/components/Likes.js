import React, { useContext, useEffect, useState } from "react";
import heartGray from "../../../assets/images/heart-gray.png";
import heartGreen from "../../../assets/images/heart-green.png";
import { UserContext } from "../../../UserContext";
import { addLike, deleteLike } from "../../../firebase/likes";

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
        <img src={heartEmoji} className="heart-icon" alt=""></img>
        <div className="like-count">{likes}</div>
      </div>
    );
  } else {
    return (
      <div className="like-container">
        <img src={heartEmoji} className="heart-icon" alt=""></img>
        <div className="like-count">{likes}</div>
      </div>
    );
  }
};

export default Likes;

// when you click on the Likes, that post should get an additional Likes

// travel through the users post to give like (like means increase lenght)

// updatedoc(users / usersID / usersPostID);
