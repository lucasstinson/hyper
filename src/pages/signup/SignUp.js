import React, { useContext, useEffect, useState } from "react";
import "./signup.css";
import hyperLogo from "../../assets/images/hyper-logo-green.png";
import { Link } from "react-router-dom";
import { createUser } from "../../firebase/signup";
import { UserContext } from "../../UserContext";
import userWhite from "../../assets/images/user-white.png";
import { getEmails, getUsernames } from "../../firebase/signup";

const SignUp = () => {
  const { setBio, setName, setPhotoURL } = useContext(UserContext);

  // contains all emails on the app, used for client side validation
  const [userEmails, setUserEmails] = useState(null);

  // contains all usernames on the app, used for client side validation
  const [usernames, setUsernames] = useState(null);

  // used to disable/enable the sign up button based on client side validation
  const [disabled, setDisabled] = useState(true);

  // email, username, and password collected for client side validation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // boolean values related to whether a parameter is valid
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);

  // function used to verify email validity
  const emailCheck = (e) => {
    setEmail(e.target.value);
    const email = document.querySelector("#sign-up-email");
    const emailNote = document.querySelector(".sign-up-email-directions");
    const emailCheck = email.validity;

    if (emailCheck.valueMissing) {
      emailNote.classList.add("invalid");
      emailNote.classList.remove("valid");
      emailNote.textContent = "Please input an email address";
      setEmailValid(false);
    } else if (emailCheck.patternMismatch) {
      emailNote.classList.add("invalid");
      emailNote.classList.remove("valid");
      emailNote.textContent = "Please input a valid email address";
      setEmailValid(false);
    } else if (userEmails.includes(email.value)) {
      emailNote.classList.add("invalid");
      emailNote.classList.remove("valid");
      emailNote.textContent = "This email address is already taken";
      setEmailValid(false);
    } else {
      emailNote.classList.add("valid");
      emailNote.classList.remove("invalid");
      emailNote.textContent = "Email is valid";
      setEmailValid(true);
    }
  };

  // function used to verify password validity
  const passwordCheck = (e) => {
    setPassword(e.target.value);
    const password = document.querySelector("#sign-up-password");
    const passwordNote = document.querySelector(
      ".sign-up-password-directions-container"
    );
    const passwordCheck = password.validity;
    if (passwordCheck.valueMissing) {
      passwordNote.classList.add("invalid");
      passwordNote.classList.remove("valid");
      setPasswordValid(false);
    } else if (passwordCheck.patternMismatch) {
      passwordNote.classList.add("invalid");
      passwordNote.classList.remove("valid");
      setPasswordValid(false);
    } else {
      passwordNote.classList.add("valid");
      passwordNote.classList.remove("invalid");
      setPasswordValid(true);
    }
  };

  // function used to verify username validity
  const usernameCheck = (e) => {
    setUsername(e.target.value);
    const username = document.querySelector("#sign-up-username");
    const usernameNote = document.querySelector(".sign-up-username-directions");
    const usernameCheck = username.validity;

    if (username.value.length < 4) {
      usernameNote.classList.add("invalid");
      usernameNote.classList.remove("valid");
      usernameNote.textContent = "Username is too short";
      setUsernameValid(false);
    } else if (usernameCheck.patternMismatch) {
      usernameNote.classList.add("invalid");
      usernameNote.classList.remove("valid");
      usernameNote.textContent =
        "Only underscores and alphanumeric characters allowed";
      setUsernameValid(false);
    } else if (usernames.includes(username.value)) {
      usernameNote.classList.add("invalid");
      usernameNote.classList.remove("valid");
      usernameNote.textContent = "Username is taken";
      setUsernameValid(false);
    } else {
      usernameNote.classList.add("valid");
      usernameNote.classList.remove("invalid");
      usernameNote.textContent = "Username is valid";
      setUsernameValid(true);
    }
  };

  // Validates all inputs and enables/disables submit button
  const validInputs = () => {
    if (emailValid && passwordValid && usernameValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  // submit set up criteria
  const submitUserDetails = (email, password, username) => {
    createUser(email, password, username);
    setBio("");
    setName("");
    setPhotoURL(userWhite);
  };

  // Validate all inputs on each change
  useEffect(() => {
    validInputs();
  }, [email, password, username]);

  // get all Emails and Usernames for client side validation
  useEffect(() => {
    const loadEmails = async () => {
      try {
        const emails = await getEmails();
        setUserEmails(emails);
      } catch (error) {
        const errorMessage = error.errorMessage;
      }
    };
    const loadUsernames = async () => {
      try {
        const usernames = await getUsernames();
        setUsernames(usernames);
      } catch (error) {
        const errorMessage = error.errorMessage;
      }
    };
    loadEmails();
    loadUsernames();
  }, []);

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
              pattern="^[^@]+@[^@]+\.[^@]+$"
              required
              minLength={3}
              onChange={(e) => {
                emailCheck(e);
              }}
            ></input>
            <div className="sign-up-email-directions">
              Please use a valid email
            </div>
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
              onChange={(e) => passwordCheck(e)}
            ></input>
            <div className="sign-up-password-directions-container">
              <div className="sign-up-password-directions">
                Must contain at least 8 characters with 1 number, 1 uppercase
                letter and 1 lowercase letter.
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
              pattern="^[a-zA-Z0-9_]{4,15}$"
              required
              onChange={(e) => usernameCheck(e)}
            ></input>
            <div className="sign-up-username-directions">
              Username must be 4-15 characters.
            </div>
          </div>
          <button
            disabled={disabled}
            className="register-button"
            onClick={() => {
              submitUserDetails(email, password, username);
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
          <div className="sign-up-error"> {"error"}</div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
