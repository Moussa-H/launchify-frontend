import React from "react";
import "./style.css";

const ImageandText = ({ title, description, image, imageFirst = false }) => {
  return (
    <div className="container info-section">
      <div
        className={`row align-items-center ${
          imageFirst ? "flex-row-reverse" : ""
        }`}
      >
        <div className="col-md-6 text-content">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <img src={image} alt={title} className="section-image" />
        </div>
      </div>
    </div>
  );
};

export default ImageandText;
