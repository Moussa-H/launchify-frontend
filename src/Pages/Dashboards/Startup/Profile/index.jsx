import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  LinearProgress,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import CountrySelect from "../../../../Components/CountrySelect";
import SectorPopup from "../../../../Components/SectorPopup";
import axios from "axios";

const Profile = ({ userId }) => {
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [popupOpen, setPopupOpen] = useState(false);

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

  // const [progress, setProgress] = useState(0);
  const token = localStorage.getItem("token");
console.log("token", token);
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/startups/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Full API Response:", response.data);
      console.log("Startup Data:", response.data.startup[0]); // Access the first element
      if (response.data.startup.length > 0) {
        setFormData(response.data.startup[0]); // Set the first element as form data
        setImage(response.data.startup[0].image || null); // Handle image properly
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
}, []);
console.log("response.data.startup country", formData.country);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
const handleCountryChange = (event, newValue) => {
  setFormData((prevData) => ({
    ...prevData,
    country: newValue ? newValue.label : null,
  }));
  console.log("formData.country", formData.country);
};
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFormData((prevData) => ({ ...prevData, image: file }));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFormData((prevData) => ({ ...prevData, image: file }));
    }
  };

  const handleSave = async () => {
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      if (formData.id) {
        await axios.put(`http://localhost:8000/api/startups/${userId}`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post("http://localhost:8000/api/startups", form, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please try again.");
    }
  };

  const handleAddSectorClick = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="container border p-5 mt-5">
      {/* Progress Bar */}

      {/* Image Upload Box */}
      <div className="row mb-4">
        <div className="col-12 col-md-3 d-flex flex-column align-items-center justify-content-center">
          <div
            className={`upload-box ${dragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("uploadImage").click()}
          >
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="img-fluid preview-image"
              />
            ) : (
              <div className="text-center">
                {dragging ? (
                  <p>Drop the image here...</p>
                ) : (
                  <p>Drag & Drop or Click to Upload</p>
                )}
              </div>
            )}
          </div>
          <input
            type="file"
            id="uploadImage"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>

        {/* Company Name and Description */}
        <div className="col-12 col-md-9">
          <div className="mb-3">
            <TextField
              label="Company Name"
              variant="standard"
              fullWidth
              name="company_name"
              value={formData.company_name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <TextField
              id="standard-textarea"
              label="Description"
              placeholder="Add 1-2 sentences of description for the project that will be displayed to investors as a sneak peek on the platform, our newsletters, etc."
              multiline
              variant="standard"
              fullWidth
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
            />
          </div>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon className="custom-add-icon" />}
            className="custom-add-sector-btn"
            onClick={handleAddSectorClick}
          >
            Add Sector
          </Button>
        </div>
      </div>

      {/* Section Buttons */}
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
          <div className="row">
            <div className="col-12">
              <h4 className="mb-4 fs-7">COMPANY REVIEW</h4>
            </div>
            <div className="col-12 col-md-6 mb-4">
              <TextField
                label="Founder"
                variant="filled"
                fullWidth
                name="founder"
                value={formData.founder || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-6 mb-4">
              <TextField
                label="Industries"
                variant="filled"
                fullWidth
                name="industry"
                value={formData.industry || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-4 mb-4">
              <TextField
                label="Founding Year"
                variant="filled"
                fullWidth
                name="founding_year"
                value={formData.founding_year || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-4 mb-4">
              <CountrySelect
                label="Country"
                fullWidth
                variant="filled"
                className="autocomplete"
                name="country"
                value={formData.country || null} // Pass `null` if `formData.country` is undefined
                onChange={handleCountryChange}
              />
            </div>
            <div className="col-12 col-md-4 mb-4">
              <TextField
                label="City"
                variant="filled"
                fullWidth
                name="city"
                value={formData.city || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 mb-4">
              <TextField
                label="Key Challenges"
                variant="filled"
                fullWidth
                name="key_challenges"
                value={formData.key_challenges || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 mb-4">
              <TextField
                label="Goals"
                variant="filled"
                fullWidth
                name="goals"
                value={formData.goals || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="d-flex justify-content-end mt-4">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>

      {/* Sector Popup */}
      {popupOpen && <SectorPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default Profile;
