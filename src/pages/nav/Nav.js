import React, { useContext, useEffect } from "react";
import "./nav.css";
import hyperLogo from "../../assets/images/hyper-logo-green.png";
import LoggedIn from "./components/loggedIn";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import SearchBar from "./components/SearchBar";

const Nav = () => {
  // context hook to current logged in user info.
  const { currentUser } = useContext(UserContext);

  // renders nav bar, while taking into account if a user is logged in.
  return (
    <div className="nav">
      <div className="logo-container">
        <Link to="/" className="feed-link">
          <img src={hyperLogo} className="logo-img" alt="hyperspeed"></img>
          <div className="logo-title">Hyper</div>
        </Link>
      </div>
      <SearchBar />
      {!currentUser && (
        <div className="access-buttons-container">
          <Link to={"/signup"}>
            <button className="sign-up-button">Sign Up</button>
          </Link>
          <Link to={"/login"}>
            <button className="log-in-button">Log in</button>
          </Link>
        </div>
      )}
      {currentUser && <LoggedIn />}
    </div>
  );
};

export default Nav;
