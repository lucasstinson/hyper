import React, { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import Search from "./Search.js";

const SearchBar = () => {
  const [showPost, setShowPost] = useState(false);
  const [userText, setUserText] = useState("");

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
