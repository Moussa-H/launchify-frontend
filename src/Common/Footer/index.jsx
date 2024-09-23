import React from "react";
import "./style.css";
import logo from "../../assets/logo-white.svg";
import { Link } from "react-router-dom";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link
                to="https://instagram.com"
                className="btn btn-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </Link>
              <Link
                to="https://twitter.com"
                className="btn btn-link"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
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
                <Link to="/startups" onClick={scrollToTop}>
                  Startups
                </Link>
              </li>
              <li>
                <Link to="/investors" onClick={scrollToTop}>
                  Investors
                </Link>
              </li>
              <li>
                <Link to="/mentors" onClick={scrollToTop}>
                  Mentors
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Store */}
          <div className="col-md-2">
            <h5>Store</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about-us" onClick={scrollToTop}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/sign-up" onClick={scrollToTop}>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={scrollToTop}>
                  Login
                </Link>
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
