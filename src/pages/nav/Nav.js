import React from "react";
import "./nav.css";
import hyperLogo from "../../assets/images/hyper-logo-green.png";
import LoggedIn from "./Components/loggedIn";
import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <div className="logo-container">
        <Link to="/" className="feed-link">
          <img src={hyperLogo} className="logo-img" alt="hyperspeed"></img>
          <div className="logo-title">Hyper</div>
        </Link>
      </div>
      <div className="search-bar-container">
        <input
          type="search"
          id="search-bar"
          name="search-bar"
          placeholder="@ Username"
        ></input>
      </div>
      <LoggedIn />

      {/* <div className="access-buttons-container">
        <Link to={"/signup"}>
          <button className="sign-up-button">Sign Up</button>
        </Link>
        <Link to={"/login"}>
          <button className="log-in-button">Log in</button>
        </Link>
      </div> */}
    </div>
  );
};

export default Nav;

// If logged in replace access-buttons-container with LoggedIn
// Changed LoggedIn to LoggedIn status and have either the sign up / sign In
// or the navbar

// https://react.dev/reference/react-dom/createPortal
