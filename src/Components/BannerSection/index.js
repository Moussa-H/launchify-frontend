import React from "react";

import "./style.css"; 

const BannerSection = ({ title, image }) => {
  return (
    <div className="banner-section">
      <img src={image} alt="Banner" className="banner-image" />
      <div className="banner-content text-center">
        <h1>{title}</h1>
      </div>
    </div>
  );
};


export default BannerSection;
