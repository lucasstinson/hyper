import React from "react";
import "./login.css";
import hyperLogo from "../../assets/images/hyper-logo-green.png";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";

const LogIn = () => {
  return (
    <div className="log-in-container">
      <div className="log-in-form">
        <div className="log-in-form-top-container">
          <Link className="log-in-exit" to={"/"}>
            x
          </Link>
          <img
            src={hyperLogo}
            className="sign-up-logo-img"
            alt="hyperspeed"
          ></img>
          <div className="empty-div"></div>
        </div>
        <div className="log-in-form-main-container">
          <div className="log-in-title">Log In</div>
          <div className="log-in-email-container">
            <input
              type="email"
              id="log-in-email"
              name="log-in-email"
              placeholder="Email"
            ></input>
          </div>
          <div className="log-in-password-container">
            <input
              type="password"
              id="log-in-password"
              name="log-in-password"
              placeholder="Password"
            ></input>
          </div>

          <button className="sign-in-button">Log In</button>
          <div className="create-an-account-container">
            <div className="create-an-account-text">
              Don't have an account?
              <Link className="sign-up-link" to={"/signup"}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
