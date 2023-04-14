import React, { useEffect, useState } from "react";
import "./signup.css";
import hyperLogo from "../../assets/images/hyper-logo-green.png";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="sign-up-container">
      <div className="sign-up-form">
        <div className="sign-up-form-top-container">
          <Link className="sign-up-exit" to={"/"}>
            x
          </Link>
          <img
            src={hyperLogo}
            className="sign-up-logo-img"
            alt="hyperspeed"
          ></img>
          <div className="empty-div"></div>
        </div>
        <div className="sign-up-form-main-container">
          <div className="sign-up-title">Create Your Account</div>
          <div className="sign-up-email-container">
            <input
              type="email"
              id="sign-up-email"
              name="sign-up-email"
              placeholder="Email"
            ></input>
          </div>
          <div className="sign-up-password-container">
            <input
              type="password"
              id="sign-up-password"
              name="sign-up-password"
              placeholder="Password"
            ></input>
          </div>
          <div className="sign-up-username-container">
            <input
              type="text"
              id="sign-up-password"
              name="sign-up-password"
              maxLength={15}
              placeholder="Username"
            ></input>
          </div>
          <button className="register-button">Sign Up</button>
          <div className="have-an-account-container">
            <div className="have-an-account-text">
              Already have an account?
              <Link className="log-in-link" to={"/login"}>
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
