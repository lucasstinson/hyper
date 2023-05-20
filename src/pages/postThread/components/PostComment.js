import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../UserContext";
import { addComment } from "../../../firebase/comment";

const PostComment = (props) => {
  // context hook to grab state variables
  const { photoURL, setRerender, rerender, currentUser } =
    useContext(UserContext);

  // state variable of post
  const { post } = props;

  // unique ID of user who made post
  let postUserID = post.uniqueID;

  // unique ID of post
  let postID = post.post.id;

  // unique ID of current user
  let currentUserID = currentUser.uid;

  // Initial state of submit button
  const [disabled, setDisabled] = useState(true);

  // Initial character count of currently updating comment
  const [postCharacters, setPostCharacters] = useState(0);

  // Initial text of currently updating comment
  const [postText, setPostText] = useState("");

  // upon clicking the submit button, will add comment to firebase
  // will close the comment modal and will update the rerender flag
  const createComment = async () => {
    addComment(postText, postUserID, postID, currentUserID);
    props.onClose();
    setRerender(!rerender);
  };

  // will update the disabled status and text state based on change
  useEffect(() => {
    if (postCharacters > 0) {
      setDisabled(false);
    } else setDisabled(true);
    setPostText(document.querySelector("#post-comment-input").value);
  }, [postCharacters]);

  return (
    <div className="Post-comment">
      <div className="post-comment-container">
        <div className="profile-post-comment-container">
          <img
            src={photoURL}
            className="profile-post-comment-logo"
            alt=""
          ></img>
        </div>
        <div className="post-comment-top-container">
          <div className="post-comment-exit" onClick={props.onClose}>
            x
          </div>
          <button
            disabled={disabled}
            className="shout-post-comment"
            onClick={() => createComment()}
          >
            Shout
          </button>
        </div>
        <div className="post-comment-input-container">
          <div className="post-comment-text-container">
            <textarea
              type="text"
              id="post-comment-input"
              maxLength={200}
              placeholder=" What's Going On?"
              onChange={(e) => setPostCharacters(e.target.value.length)}
            ></textarea>
            <div className="name-character-count">{postCharacters} / 200</div>
          </div>
        </div>
        <div className="post-comment-picture-container">
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

export default PostComment;
