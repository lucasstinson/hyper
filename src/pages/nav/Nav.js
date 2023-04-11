import React from "react";
import "./nav.css";
import hyperLogo from "../../assets/images/hyper-logo-green.png";

const Nav = () => {
  return (
    <div className="nav">
      <div className="logo-container">
        <img src={hyperLogo} className="logo-img" alt="hyperspeed"></img>
        <div className="logo-title">Hyper</div>
      </div>
      <div className="search-bar-container">
        <input
          type="search"
          id="search-bar"
          name="search-bar"
          placeholder="@ Username"
        ></input>
      </div>
      <div className="access-buttons-container">
        <button className="sign-up-button">Sign Up</button>
        <button className="log-in-button">Log in</button>
      </div>
    </div>
  );
};

export default Nav;
