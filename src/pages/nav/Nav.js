import React, { useContext, useEffect } from "react";
import "./nav.css";
import hyperLogo from "../../assets/images/hyper-logo-green.png";
import LoggedIn from "./components/loggedIn";
import { useState } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import { useAuth } from "../../firebase/firebase";
import { UserContext } from "../../UserContext";

const Nav = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="nav">
      <div className="logo-container">
        <Link to="/feed" className="feed-link">
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
