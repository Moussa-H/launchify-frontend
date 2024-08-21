import React from "react";
import Layout from "../../Common/Layout";
import "./style.css";
import Hero from "../../assets/home-hero.png";
import JoinNowButton from "../../Components/JoinNowButton";
function Home() {
  return (
    <Layout>
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-lg-6 text-left">
            <h2>All-In-One Platform for Startups</h2>
            <p>
              Empowering startup founders, VC funds, angels, accelerators, and
              corporates with the right community, infrastructure, and tools to
              succeed.
            </p>
            <JoinNowButton />
          </div>
          <div className="col-lg-6 text-center">
            <img
              src={Hero} 
              alt="All-In-One Platform"
              className="img-fluid" 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
