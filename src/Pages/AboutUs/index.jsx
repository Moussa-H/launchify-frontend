import React from "react";
import Layout from "../../Common/Layout";
import "./style.css";
import hero from "../../assets/hero-about-us.png"

export default function AboutUs() {
  return (
    <div>
      <Layout>
        <div className="banner-section">
          <img
            src={hero} 
            alt="Banner"
            className="banner-image"
          />
          <div className="banner-content text-center">
            <h1>Connect with the best-in-class</h1>
            <h1>Startup founders, in seconds</h1>
          </div>
        </div>
      </Layout>
    </div>
  );
}
