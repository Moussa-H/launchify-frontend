import React from "react";
import Layout from "../../Common/Layout";
import styles from "./style.css"; 
import heroImage from "../../assets/hero-about-us.png";
import BannerSection from "../../Components/BannerSection";

export default function AboutUs() {
  const title = "Connect with the best-in-class startup founders, in seconds";
  return (
    <div>
      <div className={styles}>
        <Layout>
          <BannerSection title={title} image={heroImage} />
        </Layout>
      </div>
    </div>
  );
}
