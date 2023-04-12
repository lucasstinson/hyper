import React from "react";
import githubLogo from "../../assets/images/github.png";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <Link to={"https://github.com/lucasstinson/"} className="github-link">
        <img className="footer-logo" src={githubLogo} alt="github logo"></img>
        <div className="footer-text">Developed by lucasstinson</div>
      </Link>
    </div>
  );
};

export default Footer;
