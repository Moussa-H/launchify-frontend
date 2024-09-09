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

const Profile = () => {
  const [image, setImage] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [sectors, setSectors] = useState([]);
  const [investmentSources, setInvestmentSources] = useState([]);
  const [startupId, setStartupid] = useState("");
  const [formData, setFormData] = useState({
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

  const token = localStorage.getItem("token");
console.log(token)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/startup`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.startups.length > 0) {
          const startup = response.data.startups[0];
          setStartupid(startup.id);
          setFormData({
            company_name: startup.company_name || "",
            description: startup.description || "",
            founder: startup.founder || "",
            industry: startup.industry || "",
            founding_year: startup.founding_year || "",
            country: startup.country || "",
            city: startup.city || "",
            key_challenges: startup.key_challenges || "",
            goals: startup.goals || "",
            business_type: startup.business_type || "",
            company_stage: startup.company_stage || "",
            employees_count: startup.employees_count || "",
            phone_number: startup.phone_number || "",
            email_address: startup.email_address || "",
            website_url: startup.website_url || "",
            currently_raising_type: startup.currently_raising_type || "",
            currently_raising_size: startup.currently_raising_size || "",
          });
          setImage(startup.image || null);
          setSectors(startup.sectors || []);
          setInvestmentSources(startup.investment_sources || []);
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

  // Append all form fields
  for (const key in formData) {
    if (Object.hasOwnProperty.call(formData, key)) {
      data.append(key, formData[key]);
    }
  }

  console.log("image", image);
  console.log("formData", formData);

  // Append image if it exists
  if (image) {
    data.append("image", image);
  }

  try {
    if (!startupId) {
      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Startup created:", response.data);
    } else {
      const response = await axios.put(`${apiUrl}/${startupId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Startup updated:", response.data);
    }
  } catch (error) {
    console.error("Error saving startup data:", error);
  }
};

  return (
    <div className="container border p-5 mt-5">
      <div className="row mb-4">
        <div className="col-12 col-md-3 d-flex flex-column align-items-center justify-content-center">
          <ImageUpload
            image={image}
            setImage={setImage}
            setFormData={setFormData}
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
    </div>
  );
};

export default Profile;
