import React, { useEffect, useState } from "react";
import "./login.css";
import hyperLogo from "../../assets/images/hyper-logo-green.png";
import { Link } from "react-router-dom";
import { logIn } from "../../firebase/login";

const LogIn = () => {
  // used to disable/enable the sign up button based on client side validation
  const [disabled, setDisabled] = useState(true);

  // email, username, and password collected for client side validation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validates all inputs and enables/disables submit button
  const validInputs = () => {
    if (email.length > 0 && password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  // Validate all inputs on each change
  useEffect(() => {
    validInputs();
  }, [email, password]);

  // submit log in details
  const userDetails = () => {
    const email = document.querySelector("#log-in-email").value;
    const password = document.querySelector("#log-in-password").value;
    logIn(email, password);
  };
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
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="log-in-password-container">
            <input
              type="password"
              id="log-in-password"
              name="log-in-password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <button
            disabled={disabled}
            className="sign-in-button"
            onClick={() => userDetails()}
          >
            Log In
          </button>
          <div className="create-an-account-container">
            <div className="create-an-account-text">
              Don't have an account?
              <Link className="sign-up-link" to={"/signup"}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
        <div className="log-in-error"> </div>
      </div>
    </div>
  );
};

export default LogIn;
