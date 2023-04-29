import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { postThread } from "../../../firebase/posts";
import FeedPosts from "../../profile/components/FeedPosts";

const UserPost = (props) => {
  const location = useLocation();
  const postID = window.location.href.split("/")[5];
  const userID = location.state.uid;

  const [userPost, setUserPost] = useState([]);

  const generateUserPost = async () => {
    try {
      const postData = await postThread(userID, postID);
      let thread = postData.map((post) => (
        <Link
          to={`/post/${post.post.id}`}
          state={{ uid: post.uniqueID }}
          className="post-link"
          data-post-id={post.post.id}
          key={post.post.createTimeExtended}
          data-user-id={post.uniqueID}
        >
          <FeedPosts post={post} userID={post.uniqueID} />
        </Link>

        // <div
        //   className="feed-post-container"
        //   data-post-id={post.post.id}
        //   key={post.post.createTimeExtended}
        // >
        //   <div className="feed-post-user-container">
        //     <Link
        //       to={`/profile/${userID}`}
        //       state={{ uid: userID }}
        //       className="post-link"
        //     >
        //       <img src={post.photoURL} className="feed-post-user" alt=""></img>
        //     </Link>
        //   </div>

        //   <div className="feed-post-info-container">
        //     <div className="feed-post-info">
        //       <Link
        //         to={`/profile/${userID}`}
        //         state={{ uid: userID }}
        //         className="post-link"
        //       >
        //         <div className="feed-post-name">
        //           {post.name}{" "}
        //           <span className="feed-post-username">{post.username}</span>
        //         </div>
        //       </Link>
        //       <div className="feed-post-time">{post.post.createDate}</div>
        //     </div>
        //     <div className="feed-post">{post.post.text}</div>
        //     <div className="feed-post-actions-container">
        //       <div className="repost-container">
        //         <img
        //           src={repostGray}
        //           className="repost-icon"
        //           alt="repost"
        //         ></img>
        //         <div className="repost-count">{post.post.Likes.length}</div>
        //       </div>
        //       <div className="like-container">
        //         <img src={heartGray} className="heart-icon" alt="like"></img>
        //         <div className="like-count">{post.post.Reposts.length}</div>
        //       </div>
        //       <div className="share-container">
        //         <img src={shareGray} className="share-icon" alt="share"></img>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      ));
      setUserPost(thread);
    } catch (error) {
      const errorMessage = error.errorMessage;
    }
  };

  useEffect(() => {
    generateUserPost();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      generateUserPost();
    }, [1000]);
  });

  return (
    <div className="Feed">
      <div className="feed-container">
        <div className="feed-list-container">{userPost}</div>
      </div>
    </div>
  );
};

export default UserPost;
