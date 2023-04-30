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
        <div
          to={`/post/${post.post.id}`}
          state={{ uid: post.uniqueID }}
          className="post-link"
          data-post-id={post.post.id}
          key={post.post.createTimeExtended}
          data-user-id={post.uniqueID}
        >
          <FeedPosts post={post} userID={post.uniqueID} />
        </div>
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
    }, [10000]);
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
