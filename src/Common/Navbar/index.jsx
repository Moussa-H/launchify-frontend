import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo.svg";
import "./style.css";

function Navbar({ comp }) {
  const navClassName = `navbar navbar-expand-lg navbar-light bg-transparent${
    comp === "home" ? " abs" : ""
  }`;

  return (
    <nav className={navClassName}>
      <div className="container-fluid w-90 mx-auto py-4">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Logo" />
        </NavLink>
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
              <NavLink
                className="nav-link"
                to="/startups"
                activeClassName="active" // Add this line
              >
                Startups
              </NavLink>
            </li>
            <li className="nav-item px-4">
              <NavLink
                className="nav-link"
                to="/investors"
                activeClassName="active" // Add this line
              >
                Investors
              </NavLink>
            </li>
            <li className="nav-item px-4">
              <NavLink
                className="nav-link"
                to="/mentors"
                activeClassName="active" // Add this line
              >
                Mentors
              </NavLink>
            </li>
            <li className="nav-item px-4">
              <NavLink
                className="nav-link"
                to="/about-us"
                activeClassName="active" // Add this line
              >
                About Us
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item px-4">
              <NavLink className="btn btn-primary mr-4" to="/sign-up">
                Join now
              </NavLink>
            </li>
            <li className="nav-item px-2">
              <NavLink
                className="btn btn-outline-primary bg-transparent border-0"
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
