import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axiosInstance from "../../axiosInstance";
import "./style.css"; // Import custom CSS for styling
import { Padding } from "@mui/icons-material";

const LastStartupsCarousel = ({ token }) => {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await axiosInstance.get(
          "/getlaststartup",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Authorization header
              "Content-Type": "application/json",
            },
          }
        );
        setStartups(response.data);
      } catch (error) {
        console.error("Error fetching startup data:", error);
      }
    };

    fetchStartups();
  }, [token]);

  const settings = {
    dots: false, // Disable dots
    infinite: false, // Disable infinite looping
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true, // Enable arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="last-startups-carousel">
      <h2 className="title-carousel"> Last Investment Startups</h2>
      <Slider {...settings}>
        {startups.map((startup, index) => (
          <div key={index} className="carousel-card">
            <div className="card-content">
              <div className="image-flex">
                <img
                  src={startup.image}
                  alt={startup.company_name}
                  className="company-logo"
                />
                <h3 className="company-name">{startup.company_name}</h3>
              </div>
              <div className="card-details">
                <p className="country">
                  <strong>Country</strong>{" "}
                  <p className="info-startup">{startup.country}</p>
                </p>
                <p className="current-value">
                  <strong>Current Value</strong>{" "}
                  <p className="info-startup">${startup.amount}</p>
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LastStartupsCarousel;
