import React from "react";
import Layout from "../../Common/Layout";
import "./style.css";
import heroImage from "../../assets/hero-startup.png";
import BannerSection from "../../Components/BannerSection";
import { ChevronRight } from "lucide-react";
import leaders from "../../assets/startup-leaders.png";
import Strategies from "../../assets/Strategies.png";
import Support from "../../assets/Support-System.png";
import Track from "../../assets/Track.png";
import TestimonialSlider from "../../Components/TestimonialSlider";
import { Link } from "react-router-dom";
 function Startups() {
  const title = "Supercharge Your Startup";
  return (
    <div>
      <Layout>
        <BannerSection title={title} image={heroImage} />
        <div className="text-center my-5 py-5">
          <h1 className="home-title px-1 my-4">
            <span className="text-primary-blue ">
              Accelerate Your Startup's Growth
            </span>
          </h1>
          <p className="home-description mx-auto my-3">
            Join Launchify, the fastest-growing community trusted by over 5,000
            startups. Unlock resources, mentorship, and funding opportunities to
            propel your startup to new heights. Our platform provides tailored
            strategies to ensure your success.
          </p>
        </div>
        <div className="container info-section">
          <div className="row align-items-center-real">
            <div className="col-md-6 text-content">
              <h2>Connect with Industry Leaders</h2>
              <p>
                Network with top mentors and investors who are eager to support
                and invest in your vision. With Launchify, you'll gain access to
                invaluable insights and advice to navigate your entrepreneurial
                journey.
              </p>
              <button className="btn-join-now">
                Join now
                <ChevronRight />
              </button>
            </div>
            <div className="col-md-6 d-flex justify-content-center-real">
              <img
                src={leaders}
                className="section-image-real"
                alt="Industry Leaders"
              />
            </div>
          </div>
        </div>
        <section className="container info-section my-5">
          <div className="row mt-5 pt-5">
            {/* Column 1: Track Your Financial Growth */}
            <div className="col-md-4 col-sm-12 text-left">
              <img src={Track} alt="Track" className="img-50px" />
              <h3 className="font-weight-bold mt-3">
                Track Your Financial Growth
              </h3>
              <p className="description">
                Monitor your startup's financial progress with our comprehensive
                analytics tools. Visualize your monthly growth, set financial
                goals, and make data-driven decisions to drive your business
                forward.
              </p>
            </div>

            {/* Column 2: Tailored Strategies for Success */}
            <div className="col-md-4 col-sm-12 text-left ">
              <img src={Strategies} alt="Strategies" className="img-50px" />
              <h3 className="font-weight-bold mt-3">
                Tailored Strategies for Success
              </h3>
              <p className="description">
                Launchify offers personalized strategies based on your product
                and market. Our expert guidance helps you implement effective
                plans, ensuring your startup's sustainable growth and
                competitive edge.
              </p>
            </div>

            {/* Column 3: Comprehensive Support System */}
            <div className="col-md-4 col-sm-12 text-left">
              <img src={Support} alt="Support" className="img-50px" />
              <h3 className="font-weight-bold mt-3">
                Comprehensive Support System
              </h3>
              <p className="description">
                Experience unmatched support with Launchify's all-inclusive
                platform. From funding assistance to real-time analytics, we
                provide everything you need to turn your startup dreams into
                reality.
              </p>
            </div>
          </div>
        </section>
        <center>
          <Link className="btn btn-primary custom-btn padding" to="/sign-up">
            Join now
          </Link>
        </center>
        <div className="container my-5">
          <TestimonialSlider />
        </div>
      </Layout>
    </div>
  );

}
export default Startups;