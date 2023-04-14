import React from "react";
import "./post.css";
import pictureGreen from "../../assets/images/picture-green.png";
import userWhite from "../../assets/images/user-white.png";

const Post = (props) => {
  return (
    <div className="Post">
      <div className="post-container">
        <div className="profile-post-container">
          <img
            src={userWhite}
            className="profile-post-logo"
            alt="users logo"
          ></img>
        </div>
        <div className="post-top-container">
          <div className="post-exit" onClick={props.onClose}>
            x
          </div>
          <button className="shout-post">Shout</button>
        </div>
        <div className="post-input-container">
          <textarea
            type="text"
            id="post-input"
            maxLength={200}
            placeholder=" What's Going On?"
          ></textarea>
        </div>
        <div className="post-picture-container">
          <img
            src={pictureGreen}
            className="post-picture-logo"
            alt="logo"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Post;

// post container
// x button to close out page...button to the right to "shout"
// image of user profile
// input text free typing for 200 characters
// also allow inclusion of images

// x and post -- flex space-between
// logo -- round logo
// typing -- should not be able to see border of text box
// include image -- image button on bottom (position: fixed or margin auto)
//best to flex column --
