import React, { useContext } from "react";
import heartGray from "../../../assets/images/heart-gray.png";
import heartGreen from "../../../assets/images/heart-green.png";
import { UserContext } from "../../../UserContext";
import { updateLikes } from "../../../firebase/likes";

const Likes = (props) => {
  const { currentUser, name } = useContext(UserContext);
  const { post } = props;
  let usersID = post.uniqueID;
  let usersPostID = post.post.id;
  let currentUserID = currentUser.uid;

  const handleClick = (e) => {
    updateLikes(usersID, usersPostID, currentUserID);
  };

  return (
    <div
      className="like-container disabled-link"
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <img src={heartGray} className="heart-icon" alt="like"></img>
      <div className="like-count">{post.post.Likes.length}</div>
    </div>
  );
};

export default Likes;

// when you click on the Likes, that post should get an additional Likes

// travel through the users post to give like (like means increase lenght)

// updatedoc(users / usersID / usersPostID);
