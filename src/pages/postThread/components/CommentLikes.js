import React, { useContext, useEffect, useState } from "react";
import heartGray from "../../../assets/images/heart-gray.png";
import heartGreen from "../../../assets/images/heart-green.png";
import { UserContext } from "../../../UserContext";
import { Link } from "react-router-dom";
import { addCommentLike, deleteCommentLike } from "../../../firebase/likes";

const CommentLikes = (props) => {
  // context hook to current logged in user info.
  const { currentUser } = useContext(UserContext);

  // state variables of post
  const { post, uid, usersPostID, postID } = props;

  // unique ID of the comment is the Time stamp of the comment
  let uniqueTimeStamp = uid;

  // unique ID of user
  let usersID = post.uniqueID;

  // Initial current logged In users ID
  let currentUserID = "";

  // if current User is logged in, update current User ID
  if (currentUser) {
    currentUserID = currentUser.uid;
  }

  // initial likes count based on how many likes exist in firebase
  const [likes, setLikes] = useState(post.Likes.length);

  // initial like emoji is gray
  const [heartEmoji, setHeartEmoji] = useState(heartGray);

  // initial userlike status
  const [userLikeStatus, setUserLikeStatus] = useState("");

  // get the IDs of every user who liked a comment.
  const likeIDs = () => {
    let IDs = [];
    for (let i = 0; i < post.Likes.length; i++) {
      IDs.push(post.Likes[i].uniqueID);
    }
    return IDs;
  };

  // update the disaplyed emoji and like status based on if the
  // a logged in user has liked a comment.
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
      deleteCommentLike(usersPostID, postID, currentUserID, uniqueTimeStamp);
    } else {
      setLikes(likes + 1);
      setHeartEmoji(heartGreen);
      setUserLikeStatus(!userLikeStatus);
      addCommentLike(usersPostID, postID, currentUserID, uniqueTimeStamp);
    }
  };

  // on Mount, get the IDs of the comment and update the emoji
  useEffect(() => {
    if (currentUser) {
      likeIDs();
      handleEmoji();
    }
  }, []);

  // if a current user is logged in, allow the ability for liking a comment
  // else the user cannot interact with a comment.
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
