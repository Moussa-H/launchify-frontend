// CompanyReview.js
import React from "react";
import { TextField } from "@mui/material";

const CompanyReview = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
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
          placeholder="Add a short description of the project..."
          multiline
          variant="standard"
          fullWidth
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default CompanyReview;
