import React from "react";
import "./style.css"; 
import logo from "../../assets/logo-white.svg"; 
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer py-5">
      <div className="container py-3">
        <div className="row px-3">
          <div className="col-md-5">
            <img src={logo} alt="Logo" className="footer-logo mb-3" />
            <p className="footer-description">
              Empowering startup founders, VC funds, angels, accelerators, and
              corporates with the right community, infrastructure, and tools to
              succeed.
            </p>
            <div className="footer-social-media">
              <Link
                to="https://facebook.com"
                className="btn btn-link"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link
                to="https://instagram.com"
                className="btn btn-link"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </Link>
              <Link
                to="https://twitter.com"
                className="btn btn-link"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </Link>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="col-md-2">
            <h5>Platform</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/startups">Startups</Link>
              </li>
              <li>
                <Link to="/investors">Investors</Link>
              </li>
              <li>
                <Link to="/mentors">Mentors</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Store */}
          <div className="col-md-2">
            <h5>Store</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/Sign-up">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="col-md-2">
            <h5>Contact Us</h5>
            <p>+961 +76 850093</p>
            <p>Launchify@info.com</p>
            <p>Beirut, Lebanon</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
