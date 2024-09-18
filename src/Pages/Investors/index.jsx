import React from "react";
import Layout from "../../Common/Layout";
import heroImage from "../../assets/Hero-investor.png";
import BannerSection from "../../Components/BannerSection";
import ImageandText from "../../Components/ImageandText";
import image1 from "../../assets/Discover-startups.png";
import image2 from "../../assets/Investment-process.png";
import image3 from "../../assets/Monitor.png";

export default function Investors() {
  const title =
    "Unlock Unmatched Investment Opportunities with Launchify Startups";
  return (
    <div>
      <Layout>
        <BannerSection title={title} image={heroImage} />

        <ImageandText
          title="Discover Promising Startups"
          description="Explore a curated portfolio of innovative startups ready for investment. Launchify connects you with high-potential ventures across various industries, giving you the opportunity to diversify your investment portfolio and support groundbreaking ideas."
          image={image1}
        />
        <ImageandText
          title="Seamless Investment Process"
          description="Investing in startups has never been easier. With Launchify, you can review detailed profiles, financial projections, and growth strategies of each startup. Our streamlined process ensures that you can make informed decisions quickly and confidently."
          image={image2}
          imageFirst={true}
        />
        <ImageandText
          title="Monitor Your Investments"
          description="Keep track of your investments with real-time analytics and progress reports. Launchify provides you with comprehensive tools to monitor the growth and performance of your investments, ensuring transparency and maximizing your returns."
          image={image3}
        />
      </Layout>
    </div>
  );
}
