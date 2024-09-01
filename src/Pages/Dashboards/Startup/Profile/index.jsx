import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./style.css"

const Profile = () => {
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const theme = useTheme();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
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
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container border p-4 mt-4">
      {/* Image Upload Box */}
      <div className="row mb-4">
        <div className="col-md-3 d-flex flex-column align-items-center justify-content-center">
          <div
            className={`upload-box border p-3 d-flex align-items-center justify-content-center ${
              dragging ? "dragging" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("uploadImage").click()}
            style={{
              cursor: "pointer",
              width: "100%",
              height: "200px",
              textAlign: "center",
              backgroundColor: "#f9f9f9",
            }}
          >
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="img-fluid"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
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
            accept="image/*"
            className="form-control mt-2"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>

        {/* Company Name and Description */}
        <div className="col-md-9">
          <div className="mb-3">
            <TextField
              label="Company Name"
              variant="standard"
              fullWidth
              sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0%)" }}
            />
          </div>
          <div className="mb-3">
            <TextField
              id="standard-textarea"
              label="Description"
              placeholder="Add 1-2 sentences of description for the project that will be displayed to investors as a sneak peak on the platform, our newsletters etc."
              multiline
              variant="standard"
              fullWidth
              sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0%)" }}
            />
          </div>
          <Button variant="contained" color="primary">
            Add Sector
          </Button>
        </div>
      </div>

      {/* Section Buttons */}
      <div className="row mb-4">
        <div className="col">
          <Button
            className={`custom-btn ${
              activeSection === "overview" ? "active" : ""
            }`}
            onClick={() => setActiveSection("overview")}
          >
            Overview
          </Button>
          <Button
            className={`custom-btn ms-2 ${
              activeSection === "team" ? "active" : ""
            }`}
            onClick={() => setActiveSection("team")}
          >
            Team
          </Button>
        </div>
      </div>

      {/* Dynamic Content Based on Active Section */}
      {activeSection === "overview" && (
        <div className="container border p-4 mt-4">
          <h4>COMPANY REVIEW</h4>
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <TextField
                label="Founder"
                variant="filled"
                fullWidth
                sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0%)" }}
              />
            </div>
            <div className="col-md-6 mb-3">
              <TextField
                label="Industries"
                variant="filled"
                fullWidth
                sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0%)" }}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4 mb-3">
              <TextField
                label="Founding Year"
                variant="filled"
                fullWidth
                sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0%)" }}
              />
            </div>
            <div className="col-md-4 mb-3">
              <FormControl fullWidth variant="filled">
                <InputLabel>Country</InputLabel>
                <Select
                  label="Country"
                  sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0%)" }}
                >
                  {/* Populate with country options */}
                  <MenuItem value="usa">United States</MenuItem>
                  <MenuItem value="canada">Canada</MenuItem>
                  {/* Add more countries as needed */}
                </Select>
              </FormControl>
            </div>
            <div className="col-md-4 mb-3">
              <TextField
                label="City"
                variant="filled"
                fullWidth
                sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0%)" }}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <TextField
                label="Key Challenges"
                variant="filled"
                fullWidth
                sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0%)" }}
              />
            </div>
            <div className="col-md-6 mb-3">
              <TextField
                label="Goals"
                variant="filled"
                fullWidth
                sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0%)" }}
              />
            </div>
          </div>
        </div>
      )}

      {activeSection === "team" && (
        <div className="container border p-4 mt-4">
          <Button variant="contained" color="primary">
            Add Member
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
