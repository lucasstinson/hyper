import React, { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import Search from "./Search.js";

const SearchBar = () => {
  // Initial flag on whether to show the users modal
  const [showPost, setShowPost] = useState(false);

  // Initial value of user name being searched
  const [userText, setUserText] = useState("");

  // renders a drop down when search bar is clicked
  return (
    <div className="search-bar-container">
      <input
        type="search"
        id="search-bar"
        name="search-bar"
        placeholder="@ Username"
        onClick={() => setShowPost(true)}
        onChange={(e) => setUserText(e.target.value)}
      ></input>
      {showPost &&
        createPortal(
          <Search onClose={() => setShowPost(false)} userText={userText} />,
          document.querySelector(".App")
        )}
    </div>
  );
};

export default SearchBar;
