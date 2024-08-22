import React from "react";
import Layout from "../../Common/Layout";
import "./style.css";
import Hero from "../../assets/home-hero.png";
import JoinNowButton from "../../Components/JoinNowButton";
import { Link } from "react-router-dom";
import TestimonialSlider from "../../Components/TestimonialSlider";
function Home() {
  return (
    <Layout>
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-lg-6 text-left px-3">
            <h2>All-In-One Platform for Startups</h2>
            <p>
              Empowering startup founders, VC funds, angels, accelerators, and
              corporates with the right community, infrastructure, and tools to
              succeed.
            </p>
            <JoinNowButton />
          </div>
          <div className="col-lg-6 text-center">
            <img src={Hero} alt="All-In-One Platform" className="img-fluid" />
          </div>
        </div>
        <div className="text-center my-5">
          <h1 className="home-title px-1">
            <span className="text-dark-gray">
              Boost Your Success with Powerful
            </span>
            <br />
            <span className="text-primary-blue">Tools and Connections</span>
          </h1>
          <p className="home-description mx-auto my-3">
            Whether you're developing a startup, managing a VC fund, leading a
            business angel network, running an accelerator, or a corporate
            program, Vestbee is your go-to platform with seamless tools, and
            high-quality connections.
          </p>
        </div>
        {/* Cards Section */}
        <div className="row">
          <div className="col-md-6 my-5">
            <div className="card startups-card p-5">
              <h3 className="card-title">Startups</h3>
              <h5 className="card-subtitle mb-3">
                Startup founders & team members
              </h5>
              <p className="card-text text-muted">
                Get funded by top VCs and foster your business growth with the
                right community and infrastructure.
              </p>
              <div className="d-flex justify-content-left mt-4 mr-4">
                <JoinNowButton />
                <Link
                  className="btn btn-outline-primary bg-transparent border-0 ms-3"
                  to="/login"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 my-5">
            <div className="card investors-card p-5">
              <h3 className="card-title">Investors</h3>
              <h5 className="card-subtitle mb-3">
                VC Funds, Angel Syndicates & Networks
              </h5>
              <p className="card-text text-muted">
                Get access to high-quality startups, improve deal flow, and keep
                emerging companies on your radar.
              </p>
              <div className="d-flex justify-content-left mt-4 mr-4">
                <JoinNowButton />
                <Link
                  className="btn btn-outline-primary bg-transparent border-0 ms-3"
                  to="/login"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="stats-section py-5 my-5 custom-rounded">
          <div className="container">
            <div className="row text-center">
              {/* First Column */}
              <div className="col-md-4 my-5">
                <h2 className="stats-title">5,000+</h2>
                <div className="stats-line mx-auto mb-3"></div>
                <p className="stats-subtitle">Startups and Investors</p>
              </div>

              {/* Second Column */}
              <div className="col-md-4 my-5">
                <h2 className="stats-title">$100M+</h2>
                <div className="stats-line mx-auto mb-3"></div>
                <p className="stats-subtitle">Raised by Startups</p>
              </div>

              {/* Third Column */}
              <div className="col-md-4 my-5">
                <h2 className="stats-title">100+</h2>
                <div className="stats-line mx-auto mb-3"></div>
                <p className="stats-subtitle">Mentors</p>
              </div>
            </div>
          </div>
        </div>
        <TestimonialSlider />
      </div>
    </Layout>
  );
}

export default Home;
