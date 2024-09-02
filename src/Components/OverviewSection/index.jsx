// OverviewSection.js
import React from "react";
import { TextField } from "@mui/material";
import CountrySelect from "../CountrySelect";


const OverviewSection = ({ formData, handleInputChange }) => (
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
          fullWidth
          variant="filled"
          className="autocomplete"
          name="country"
          value={formData.country || ""}
          onChange={handleInputChange}
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
);

export default OverviewSection;
