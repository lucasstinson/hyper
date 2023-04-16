import React from "react";
import userWhite from "../../assets/images/user-white.png";
import "./feed.css";
import repostGray from "../../assets/images/repost-gray.png";
import repostGreen from "../../assets/images/repost-green.png";
import heartGray from "../../assets/images/heart-gray.png";
import heartGreen from "../../assets/images/heart-green.png";
import shareGray from "../../assets/images/share-gray.png";
import shareGeen from "../../assets/images/share-gray.png";

const Feed = () => {
  return (
    <div className="Feed">
      <div className="feed-container">
        <div className="feed-list-container">
          <div className="feed-post-container">
            <div className="feed-post-user-container">
              <img
                src={userWhite}
                className="feed-post-user"
                alt="user pic"
              ></img>
            </div>
            <div className="feed-post-info-container">
              <div className="feed-post-info">
                <div className="feed-post-name">
                  user's name{" "}
                  <span className="feed-post-username">@user_name</span>
                </div>
                <div className="feed-post-time">Aug 12, 2022</div>
              </div>
              <div className="feed-post">
                This is going to be limited to 200 characters as to properly
                test the posts and adding to get 200...
              </div>
              <div className="feed-post-actions-container">
                <div className="repost-container">
                  <img
                    src={repostGray}
                    className="repost-icon"
                    alt="repost"
                  ></img>
                  <div className="repost-count">10</div>
                </div>
                <div className="like-container">
                  <img src={heartGray} className="heart-icon" alt="like"></img>
                  <div className="like-count">17</div>
                </div>
                <div className="share-container">
                  <img src={shareGray} className="share-icon" alt="share"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
