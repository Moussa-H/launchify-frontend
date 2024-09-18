import React from "react";
import Layout from "../../Common/Layout";
import heroImage from "../../assets/Hero-investor.png";
import BannerSection from "../../Components/BannerSection";
import ImageandText from "../../Components/ImageandText";
import image1 from "../../assets/Connect-mentor.png";
import image2 from "../../assets/Mentorship.png";
import image3 from "../../assets/Chatting-amico.png";


export default function Mentors() {
  const title = "Empower Startups with Your Expertise and Guidance";
  return (
    <div>
      <Layout>
        <BannerSection title={title} image={heroImage} />

        <ImageandText
          title="Connect with Experienced Mentors"
          description="Discover a network of seasoned professionals eager to share their expertise and guide your startup to success. Launchify mentors come from diverse industries, offering valuable insights tailored to your specific needs and goals."
          image={image1}
        />
        <ImageandText
          title="Personalized Mentorship Tailored to Your Product"
          description="IReceive customized guidance based on your startup's unique product and market. Our mentors analyze your specific challenges and opportunities, providing actionable strategies to accelerate your growth and achieve your objectives."
          image={image2}
          imageFirst={true}
        />
        <ImageandText
          title="Real-Time Chat for Continuous Support"
          description="Enjoy seamless communication with your mentors through our real-time chat feature. Get immediate feedback, advice, and support whenever you need it, ensuring you stay on track and make informed decisions."
          image={image3}
        />
      </Layout>
    </div>
  );
}
