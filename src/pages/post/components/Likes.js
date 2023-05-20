import React, { useContext, useEffect, useState } from "react";
import heartGray from "../../../assets/images/heart-gray.png";
import heartGreen from "../../../assets/images/heart-green.png";
import { UserContext } from "../../../UserContext";
import { addLike, deleteLike } from "../../../firebase/likes";
import { Link } from "react-router-dom";

const Likes = (props) => {
  // context hook to current logged in user info.
  const { currentUser } = useContext(UserContext);

  // state variables of post
  const { post } = props;

  // unique ID of user
  let usersID = post.uniqueID;

  // unique ID of current post
  let usersPostID = post.post.id;

  // Initial current logged In users ID
  let currentUserID = "";

  // if current User is logged in, update current User ID
  if (currentUser) {
    currentUserID = currentUser.uid;
  }

  // initial likes count based on how many likes exist in firebase
  const [likes, setLikes] = useState(post.post.Likes.length);

  // initial like emoji is gray
  const [heartEmoji, setHeartEmoji] = useState(heartGray);

  // initial userlike status
  const [userLikeStatus, setUserLikeStatus] = useState("");

  // get the IDs of every user who liked a comment.
  const likeIDs = () => {
    let IDs = [];
    for (let i = 0; i < post.post.Likes.length; i++) {
      IDs.push(post.post.Likes[i].uniqueID);
    }
    return IDs;
  };

  // update the disaplyed emoji and like status based on if the
  // a logged in user has liked the post
  const handleEmoji = () => {
    if (likeIDs().includes(currentUserID)) {
      setHeartEmoji(heartGreen);
      setUserLikeStatus(true);
    } else {
      setHeartEmoji(heartGray);
      setUserLikeStatus(false);
    }
  };

  // when the like button is clicked update the amount of likes,
  // the heart emoji, the like status and add/delete from firebase.
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

  // on Mount, get the IDs of the post and update the emoji
  useEffect(() => {
    if (currentUser) {
      likeIDs();
      handleEmoji();
    }
  }, []);

  // if a current user is logged in, allow the ability for liking a post
  // else the user cannot interact with a post.
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
