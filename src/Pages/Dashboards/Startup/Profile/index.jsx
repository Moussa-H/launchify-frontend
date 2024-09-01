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
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import countryList from "react-select-country-list";
import CountrySelect from "../../../../Components/CountrySelect";

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
    <div className="container border p-5 mt-5">
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
            <TextField label="Company Name" variant="standard" fullWidth />
          </div>
          <div className="mb-3">
            <TextField
              id="standard-textarea"
              label="Description"
              placeholder="Add 1-2 sentences of description for the project that will be displayed to investors as a sneak peek on the platform, our newsletters, etc."
              multiline
              variant="standard"
              fullWidth
            />
          </div>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon className="custom-add-icon" />}
            className="custom-add-sector-btn"
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
      {activeSection === "overview" && (
        <div className="container border-0 p-4 mt-4">
          <div className="row">
            <div className="col-12">
              <h4 className="mb-4 fs-7">COMPANY REVIEW</h4>
            </div>
            <div className="col-12 col-md-6 mb-4">
              <TextField label="Founder" variant="filled" fullWidth />
            </div>
            <div className="col-12 col-md-6 mb-4">
              <TextField label="Industries" variant="filled" fullWidth />
            </div>
            <div className="col-12 col-md-4 mb-4">
              <TextField label="Founding Year" variant="filled" fullWidth />
            </div>
            <div className="col-12 col-md-4 mb-4">
              <CountrySelect
                fullWidth
                variant="filled"
                className="autocomplete"
              />
            </div>
            <div className="col-12 col-md-4 mb-4">
              <TextField label="City" variant="filled" fullWidth />
            </div>
            <div className="col-12 col-md-6 mb-4">
              <TextField label="Key Challenges" variant="filled" fullWidth />
            </div>
            <div className="col-12 col-md-6 mb-4">
              <TextField label="Goals" variant="filled" fullWidth />
            </div>
          </div>

          <hr className="mt-5 mb-4" />

          <div className="row">
            <div className="col-12">
              <h4 className="mb-4 fs-7">DETAILS</h4>
            </div>
            <div className="col-12 col-md-6 mb-4">
              <FormControl variant="filled" fullWidth>
                <InputLabel>Business Type</InputLabel>
                <Select>
                  <MenuItem value="B2B">B2B</MenuItem>
                  <MenuItem value="B2C">B2C</MenuItem>
                  <MenuItem value="B2B2C">B2B2C</MenuItem>
                  <MenuItem value="B2G">B2G</MenuItem>
                  <MenuItem value="C2C">C2C</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-12 col-md-6 mb-4">
              <FormControl variant="filled" fullWidth>
                <InputLabel>Company Stage</InputLabel>
                <Select>
                  <MenuItem value="Idea">Idea</MenuItem>
                  <MenuItem value="Pre-seed">Pre-seed</MenuItem>
                  <MenuItem value="Seed">Seed</MenuItem>
                  <MenuItem value="Early Growth">Early Growth</MenuItem>
                  <MenuItem value="Growth">Growth</MenuItem>
                  <MenuItem value="Maturity">Maturity</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-12 col-md-6 mb-4">
              <TextField
                label="Employees Count"
                type="number"
                variant="filled"
                fullWidth
              />
            </div>
            <div className="col-12 col-md-6 mb-4">
              <TextField label="Phone Number" variant="filled" fullWidth />
            </div>
            <div className="col-12 col-md-6 mb-4">
              <TextField
                label="Email Address"
                type="email"
                variant="filled"
                fullWidth
              />
            </div>
            <div className="col-12 col-md-6 mb-4">
              <TextField
                label="Website URL"
                type="url"
                variant="filled"
                fullWidth
              />
            </div>
          </div>

          {/* New Section */}
          <div className="row">
            <div
              className="col-6 mt-5 p-4"
              style={{
                backgroundColor: "#FFF2CC",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius:"10px"
              }}
            >
              <h4 className="mb-4 fs-7">CURRENTLY RAISING</h4>
              <p style={{ fontSize: "14px", color: "#6D6D6D" }}>
                The external funding the project needs now.
              </p>
              <Button
                variant="contained"
                className="btn-current-round"
              
              >
                Set Current Round
              </Button>
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
