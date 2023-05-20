import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentLikes from "../../postThread/components/CommentLikes";
import { getReplies } from "../../../firebase/comment";
import { UserContext } from "../../../UserContext";

const Comments = (props) => {
  // context hook to grab rerender flag
  const { rerender } = useContext(UserContext);

  // state variables of post
  const { postID, userID } = props;

  // Initial variable of comment counts related to a post
  const [userComments, setUserComments] = useState([]);

  // will generate the comment count on launch
  useEffect(() => {
    generateComments(userID, postID);
  }, []);

  // upon rerender changing, will render comments after 1 sec delay.
  useEffect(() => {
    setTimeout(() => {
      generateComments(userID, postID);
    }, [1000]);
  }, [rerender]);

  // gets all comments and profile data related to each comment on a
  //  post, then sets the userComments state variable to the JSX
  // mapped comments.
  const generateComments = async (userID, postID) => {
    try {
      const replyData = await getReplies(userID, postID);
      let replies = replyData.map((post) => (
        <div
          className="comment-post-container"
          key={post.timestampExtended}
          data-time-id={post.timestampExtended}
        >
          <div className="comment-post-user-container">
            <Link
              to={`/profile/${post.uniqueID}`}
              state={{ uid: post.uniqueID }}
              className="post-link"
            >
              <img
                src={post.photoURL}
                className="comment-post-user"
                alt=""
              ></img>
            </Link>
          </div>
          <div className="comment-post-info-container">
            <div
              className="comment-post-info-link"
              key={post.createTimeExtended}
              data-user-id={post.uniqueID}
            >
              <div className="comment-post-info">
                <Link
                  to={`/profile/${post.uniqueID}`}
                  state={{ uid: post.uniqueID }}
                  className="post-link"
                >
                  <div className="comment-post-name">
                    {post.name}{" "}
                    <span className="comment-post-username">
                      {post.username}
                    </span>
                  </div>
                </Link>
                <div className="comment-post-time">{post.createDate}</div>
              </div>
              <div className="comment-post">{post.text}</div>
            </div>
            <div className="comment-post-actions-container">
              <CommentLikes
                post={post}
                usersPostID={userID}
                postID={postID}
                uid={post.timestampExtended}
              />
            </div>
          </div>
        </div>
      ));
      setUserComments(replies);
    } catch (error) {
      const errorMessage = error.message;
    }
  };

  return <div>{userComments}</div>;
};

export default Comments;
