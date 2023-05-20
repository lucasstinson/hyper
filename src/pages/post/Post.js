import React, { useContext, useEffect, useState } from "react";
import "./post.css";
// import pictureGreen from "../../assets/images/picture-green.png";
import { UserContext } from "../../UserContext";
import { addPost } from "../../firebase/posts";

const Post = (props) => {
  // context hook used to grab current users state variables
  const { photoURL, setRerender, rerender } = useContext(UserContext);

  // Initial state of submit button
  const [disabled, setDisabled] = useState(true);

  // Initial character count of currently updating comment
  const [postCharacters, setPostCharacters] = useState(0);

  // Initial text of currently updating comment
  const [postText, setPostText] = useState("");

  // upon clicking the submit button, the post is added to firebase
  // the post modal will close the rerender flag will be updated.
  const createPost = async () => {
    addPost(postText);
    props.onClose();
    setRerender(!rerender);
  };

  // will update the disabled status and text state based on change
  useEffect(() => {
    if (postCharacters > 0) {
      setDisabled(false);
    } else setDisabled(true);
    setPostText(document.querySelector("#post-input").value);
  }, [postCharacters]);

  return (
    <div className="Post">
      <div className="post-container">
        <div className="profile-post-container">
          <img
            src={photoURL}
            className="profile-post-logo"
            alt="users logo"
          ></img>
        </div>
        <div className="post-top-container">
          <div className="post-exit" onClick={props.onClose}>
            x
          </div>
          <button
            disabled={disabled}
            className="shout-post"
            onClick={() => createPost()}
          >
            Shout
          </button>
        </div>
        <div className="post-input-container">
          <div className="post-text-container">
            <textarea
              type="text"
              id="post-input"
              maxLength={200}
              placeholder=" What's Going On?"
              onChange={(e) => setPostCharacters(e.target.value.length)}
            ></textarea>
            <div className="name-character-count">{postCharacters} / 200</div>
          </div>
        </div>
        <div className="post-picture-container">
          {/* <img
            src={pictureGreen}
            className="post-picture-logo"
            alt="logo"
          ></img> */}
        </div>
      </div>
    </div>
  );
};

export default Post;
