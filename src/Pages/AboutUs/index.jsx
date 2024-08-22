import React from "react";
import Layout from "../../Common/Layout";

import heroImage from "../../assets/hero-about-us.png";
import BannerSection from "../../Components/BannerSection";

export default function AboutUs() {
  const title = "Connect with the best-in-class startup founders, in seconds";
  return (
    <div>
   
        <Layout>
          <BannerSection title={title} image={heroImage} />
            <InfoSection
        title="Our Mission:"
        description="Our mission is to empower startups by providing them with the tools and insights they need to bring innovative app ideas to life, ensuring success in a competitive market."
        image={image1}
      />
      <InfoSection
        title="Our Vision:"
        description="We envision a future where every startup has access to the resources and support necessary to thrive in an ever-evolving tech landscape."
        image={image2}
        imageFirst={true}
      />
      <InfoSection
        title="Our Values:"
        description="We value innovation, dedication, and the drive to succeed. Our goal is to foster an environment where startups can grow and excel."
        image={image3}
      />
   
        </Layout>
      </div>

  );
}
