import React, { useState, useEffect } from "react";
import { Button, Snackbar } from "@mui/material";
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
  
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const token = localStorage.getItem("token");




const saveSectors = (selectedSectors) => {
  const sectorData = selectedSectors.map((id) => {
    const sector = sectors.find((sector) => sector.id === id);
    return { id: sector.id, name: sector.name };
  });

  if (formData.id) {
    axios
      .post(
        `http://localhost:8000/api/sectors/${formData.id}`,
        { sectors: sectorData }, // Request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Handle success, maybe update the sectors state
        console.log("Sectors updated successfully", response.data);
      })
      .catch((error) => {
        console.error("There was an error updating the sectors!", error);
      });
  } else {
    console.log("No startupId provided. Skipping API call.");
  }
};










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
            image: startup.image || null,
          }));
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

    // Log the formData to check its values
    console.log("formData before sending:", formData);

    // Append each field to FormData

    const data = {
      ...formData,
      // If you need to send the image URL instead of the file
      image: formData.image ? formData.image : null,
    };
    console.log("data",data);
    const id = formData.id;
    console.log(id,"id")
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      if (!id) {

        // Create new startup
        const response = await axios.post(apiUrl, data, { headers });
        console.log("Startup created:", response.data);
      } else {
        console.log("data updated before put", data)
        // Update existing startup
        const response = await axios.put(`${apiUrl}/${id}`, data, { headers });
        console.log("Startup updated:", response.data);
      }
      setSuccessMessage("Successfully saved changes!");
    } catch (error) {
      console.error(
        "Error saving startup data:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleImageChange = (event) => {
    setFormData((prevValues) => ({
      ...prevValues,
      image: event.target.files[0],
    }));
  };

  const handleClose = () => {
    setSuccessMessage("");
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
            errors={errors}
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
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={handleClose}
        message={successMessage}
      />
    </div>
  );
};

export default Profile;
