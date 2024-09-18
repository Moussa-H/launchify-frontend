import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import AddSector from "../../../../Components/AddSector";
import CompanyReview from "../../../../Components/CompanyReview";
import ImageUpload from "../../../../Components/ImageUpload";
import CurrentlyRaising from "../../../../Components/CurrentlyRaising";
import CompanyReviewForm from "../../../../Components/CompanyReviewForm";
import axios from "axios";
import AddMember from "../../../../Components/AddMember";
import { Box } from "@mui/material";
const Profile = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [sectors, setSectors] = useState([]);
  const [investmentSources, setInvestmentSources] = useState([]);
  const [formData, setFormData] = useState({
    image: null,
    company_name: "",
    description: "",
    founder: "",
    industry: "",
    founding_year: "",
    country: "",
    city: "",
    key_challenges: "",
    goals: "",
    business_type: "",
    company_stage: "",
    employees_count: "",
    phone_number: "",
    email_address: "",
    website_url: "",
    currently_raising_type: "",
    currently_raising_size: "",
  });

  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/startup", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.startups.length > 0) {
          const startup = response.data.startups[0];

          setFormData((prevValues) => ({
            ...prevValues,
            ...startup,
            image: startup.image || null, // Setting image if exists
          }));
          setSectors(startup.sectors || []);
          setInvestmentSources(startup.investment_sources || []);
          setImage(startup.image || null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCountryChange = (newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      country: newValue ? newValue.label : "",
    }));
  };

  const handleSave = async () => {
    const apiUrl = "http://localhost:8000/api/startup";
    const data = new FormData();

    // Append all form fields from formData
    for (const key in formData) {
      if (Object.hasOwnProperty.call(formData, key)) {
        data.append(key, formData[key]);
      }
    }

    // Append image if it exists
    if (image) {
      data.append("image", image);
    }

    const startupId = formData.id;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      if (!startupId) {
        // Create new startup
        const response = await axios.post(apiUrl, data, { headers });
        console.log("Startup created:", response.data);
      } else {
        // Update existing startup
        const response = await axios.put(`${apiUrl}/${startupId}`, data, {
          headers,
        });
        console.log("Startup updated:", response.data);
      }
    } catch (error) {
      console.error("Error saving startup data:", error);
    }
  };

  const handleImageChange = (event) => {
    setFormData((prevValues) => ({
      ...prevValues,
      image: event.target.files[0],
    }));
  };

  return (
    <div className="container border p-5 mt-5">
      <div className="row mb-4">
        <div className="col-12 col-md-3 d-flex flex-column align-items-center justify-content-center">
          <Box
            sx={{
              paddingLeft: "0px!important",
              width: "170px",
              height: "170px",
              border: "2px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => document.getElementById("imageUpload").click()}
          >
            {formData.image ? (
              <img
                src={
                  typeof formData.image === "object"
                    ? URL.createObjectURL(formData.image)
                    : formData.image
                }
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: "10px",
                }}
              />
            ) : (
              <span>Select Image</span>
            )}
          </Box>
          <input
            accept="image/*"
            type="file"
            id="imageUpload"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <div className="col-12 col-md-9">
          <CompanyReview formData={formData} setFormData={setFormData} />
          <AddSector sectors={sectors} startupId={formData.id} />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12 line-btn mt-5">
          <Button
            className={`custom-btn ms-2 ${
              activeSection === "overview" ? "active" : ""
            }`}
            onClick={() => setActiveSection("overview")}
          >
            Overview
          </Button>
          <Button
            className={`custom-btn ms-5 ${
              activeSection === "team" ? "active" : ""
            }`}
            onClick={() => setActiveSection("team")}
          >
            Team
          </Button>
        </div>
      </div>

      {/* Overview Section */}
      {activeSection === "overview" && (
        <div className="container border-0 p-4 mt-4">
          <CompanyReviewForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleCountryChange={handleCountryChange}
          />

          <CurrentlyRaising
            token={token}
            startupId={formData.id}
            currently_raising_type={formData.currently_raising_type}
            currently_raising_size={formData.currently_raising_size}
            investment_sources={investmentSources}
          />

          <div className="d-flex justify-content-end mt-4">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      )}
      {activeSection === "team" && (
        <AddMember token={token} startupId={formData.id} />
      )}
    </div>
  );
};

export default Profile;
