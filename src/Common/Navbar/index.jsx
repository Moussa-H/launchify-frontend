import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import logo from "../../assets/logo.svg";
import "./style.css";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <div className="container-fluid w-90 mx-auto py-4">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo"/>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item px-4">
              <Link className="nav-link" to="/Startups">
                Startups
              </Link>
            </li>
            <li className="nav-item px-4">
              <Link className="nav-link" to="/investors">
                Investors
              </Link>
            </li>
            <li className="nav-item px-4">
              <Link className="nav-link" to="/mentors">
                Mentors
              </Link>
            </li>
            <li className="nav-item px-4">
              <Link className="nav-link" to="/about-us">
                About Us
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="btn btn-primary mr-4" to="/sign-up">
                Join now
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="btn btn-outline-primary bg-transparent border-0"
                to="/login"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
