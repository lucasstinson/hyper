import "./search.css";
import { getUserInfo } from "../../../firebase/search";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../UserContext";

const Search = (props) => {
  // context hook for rerender flag.
  const { setRerender, rerender } = useContext(UserContext);

  // state based on text of searched user
  const { userText } = props;

  // Initial users that are being rendered in ssearch
  const [users, setUsers] = useState([]);

  // gets all user information based on passed user name text
  // if the usernames contain the text the user state will be
  // will set the the JSX mapped users.
  const generateUsers = async (text) => {
    try {
      const getUsers = await getUserInfo();
      let users = [];
      for (let i = 0; i < getUsers.length; i++) {
        let username = getUsers[i].username.toLowerCase();
        let lowerCaseText = text.toLowerCase();
        if (username.includes(lowerCaseText)) {
          users.push(getUsers[i]);
        }
      }
      const allMatchingUsers = users.map((post) => (
        <Link
          to={`/profile/${post.uniqueID}`}
          className="post-link"
          onClick={props.onClose}
          state={{ uid: post.uniqueID }}
        >
          <div
            className="user-info-container"
            onClick={() => {
              setRerender(!rerender);
            }}
          >
            <img className="user-photo" src={post.photoURL} alt=""></img>
            <div className="user">@{post.username}</div>
          </div>
        </Link>
      ));
      setUsers(allMatchingUsers);
    } catch (error) {
      const errorMessage = error.message;
    }
  };

  // render the current user pool each time the search text changes.
  useEffect(() => {
    generateUsers(userText);
  }, [userText]);

  return (
    <div className="Search">
      <div className="search-container">
        <div className="search-header">
          <div className="search-exit-contiainer">
            <div className="search-exit" onClick={props.onClose}>
              x
            </div>
          </div>
          <div className="search-title-container">
            <div className="search-title">Search</div>
          </div>
        </div>
        <div className="user-container">{users}</div>
      </div>
    </div>
  );
};

export default Search;
