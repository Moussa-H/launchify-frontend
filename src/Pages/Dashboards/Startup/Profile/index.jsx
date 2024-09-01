import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./style.css";

// Debounce function to limit how often resize handler is called

const Profile = () => {
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

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
    <div className="container p-4">
      {/* Image Upload Box */}
      <div className="upload-section">
        <div
          className={`upload-box ${dragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("uploadImage").click()}
          style={{
            border: "2px dashed #ccc",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          {image ? (
            <img
              src={image}
              alt="Preview"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ) : (
            <p>
              {dragging
                ? "Drop the image here..."
                : "Drag & Drop or Click to Upload"}
            </p>
          )}
        </div>
        <input
          type="file"
          id="uploadImage"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>

      {/* Company Name and Description */}
      <div className="company-info">
        <TextField
          label="Company Name"
          variant="standard"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          placeholder="Add a brief description of the project."
          multiline
          variant="standard"
          fullWidth
          margin="normal"
        />
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          style={{ marginTop: "20px" }}
        >
          Add Sector
        </Button>
      </div>

      {/* Section Buttons */}
      <div className="section-buttons">
        <Button
          onClick={() => setActiveSection("overview")}
          style={{
            marginRight: "10px",
            backgroundColor:
              activeSection === "overview" ? "#ddd" : "transparent",
          }}
        >
          Overview
        </Button>
        <Button
          onClick={() => setActiveSection("team")}
          style={{
            backgroundColor: activeSection === "team" ? "#ddd" : "transparent",
          }}
        >
          Team
        </Button>
      </div>

      {/* Dynamic Content Based on Active Section */}
      {activeSection === "overview" && (
        <div className="overview-section">
          <h4>COMPANY REVIEW</h4>
          <div className="form-group">
            <TextField label="Founder" variant="filled" fullWidth />
          </div>
          <div className="form-group">
            <TextField label="Industries" variant="filled" fullWidth />
          </div>
          <div className="form-group">
            <TextField label="Founding Year" variant="filled" fullWidth />
          </div>
          <div className="form-group">
            <FormControl fullWidth variant="filled">
              <InputLabel>Country</InputLabel>
              <Select label="Country">
                <MenuItem value="usa">United States</MenuItem>
                <MenuItem value="canada">Canada</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="form-group">
            <TextField label="City" variant="filled" fullWidth />
          </div>
          <div className="form-group">
            <TextField label="Key Challenges" variant="filled" fullWidth />
          </div>
          <div className="form-group">
            <TextField label="Goals" variant="filled" fullWidth />
          </div>
        </div>
      )}

      {activeSection === "team" && (
        <div className="team-section">
          <Button variant="contained" color="primary">
            Add Member
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
