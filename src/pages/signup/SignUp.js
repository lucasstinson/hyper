import React, { useContext, useEffect, useState } from "react";
import "./signup.css";
import hyperLogo from "../../assets/images/hyper-logo-green.png";
import Settings from "../settings/Settings";
import { Link, redirect } from "react-router-dom";
import { createUser } from "../../firebase/signup";
import { UserContext } from "../../UserContext";
import userWhite from "../../assets/images/user-white.png";

const SignUp = () => {
  const { setBio, setName, setPhotoURL } = useContext(UserContext);

  const submitUserDetails = () => {
    const email = document.querySelector("#sign-up-email").value;
    const password = document.querySelector("#sign-up-password").value;
    const username = document.querySelector("#sign-up-username").value;
    createUser(email, password, username);
    setBio("");
    setName("");
    setPhotoURL(userWhite);
  };

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
              required
              minLength={3}
            ></input>
            {}
          </div>
          <div className="sign-up-password-container">
            <input
              type="password"
              id="sign-up-password"
              name="sign-up-password"
              placeholder="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be at least 8 characters with 1 number, 1 uppercase and 1 lowercase letter"
              required
            ></input>
            <div className="sign-up-password-directions-container">
              <div className="sign-up-password-directions">
                Must be 8 characters with 1 number,
              </div>
              <div className="sign-up-password-directions">
                1 uppercase letter and 1 lowercase letter.
              </div>
            </div>
          </div>
          <div className="sign-up-username-container">
            <input
              type="text"
              id="sign-up-username"
              name="sign-up-username"
              maxLength={15}
              placeholder="Username"
              required
            ></input>
          </div>
          <button
            className="register-button"
            onClick={() => {
              submitUserDetails();
            }}
          >
            Sign Up
          </button>
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
