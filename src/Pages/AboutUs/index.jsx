import React from "react";
import Layout from "../../Common/Layout";
import "./style.module.css";
import heroImage from "../../assets/hero-about-us.png";
import BannerSection from "../../Components/BannerSection";
import ImageandText from "../../Components/ImageandText";
import feature1 from "../../assets/feature1.svg";
import feature2 from "../../assets/feature2.svg";
import feature3 from "../../assets/feature3.svg";
import mission from "../../assets/our-mission-image.png";

export default function AboutUs() {
  const title = "Connect with the best-in-class startup founders, in seconds";
  return (
    <div>
      <Layout>
        <BannerSection title={title} image={heroImage}/>
        <ImageandText
          title="Our Mission"
          description="Our mission is to empower startups by providing them with the tools and insights they need to bring innovative app ideas to life, ensuring success in a competitive market."
          image={mission}
        />
        <h2 className="features-heading">Our Features</h2>
        <ImageandText
          title="AI-Powered Website Idea Validation"
          description="Effortlessly validate your website ideas with our AI-driven platform that analyzes market trends, predicts success potential, and provides actionable insights to optimize your concept for success."
          image={feature1}
        />
        <ImageandText
          title="Data Collection & Preprocessing"
          description="This feature allows users gather updated data and analyze them relying on Natural Language Processing (NLP) by identifying common pain points, desired features, and areas of satisfaction"
          image={feature2}
          imageFirst={true}
        />
        <ImageandText
          title="Machine Learning Model "
          description="This feature allows users to benefit from a developed and updated model that predicts the potential of success of the app based on features by analysing competitors "
          image={feature3}
        />
      </Layout>
    </div>
  );
}
