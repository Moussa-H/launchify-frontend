import React from "react";
import { TextField, MenuItem } from "@mui/material";
import CountrySelect from "../CountrySelect"; // Adjust the import based on your project structure

const CompanyReviewForm = ({
  formData,
  handleInputChange,
  handleCountryChange,
}) => {
  return (
    <>
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
            value={formData.country || null}
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
        <div className="col-12 col-md-6 mb-4">
          <TextField
            label="Key Challenges"
            variant="filled"
            fullWidth
            name="key_challenges"
            value={formData.key_challenges || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12 col-md-6 mb-4">
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
      <hr className="mt-5 mb-4" />
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 fs-7">COMPANY REVIEW</h4>
        </div>
        <div className="col-12 col-md-4 mb-4">
          <TextField
            label="Business Type"
            variant="filled"
            fullWidth
            name="business_type"
            select
            value={formData.business_type || ""}
            onChange={handleInputChange}
          >
            <MenuItem value="B2B">B2B</MenuItem>
            <MenuItem value="B2C">B2C</MenuItem>
            <MenuItem value="B2B2C">B2B2C</MenuItem>
            <MenuItem value="B2G">B2G</MenuItem>
            <MenuItem value="C2C">C2C</MenuItem>
          </TextField>
        </div>
        <div className="col-12 col-md-4 mb-4">
          <TextField
            label="Company Stage"
            variant="filled"
            fullWidth
            name="company_stage"
            select
            value={formData.company_stage || ""}
            onChange={handleInputChange}
          >
            <MenuItem value="Idea">Idea</MenuItem>
            <MenuItem value="Pre-seed">Pre-seed</MenuItem>
            <MenuItem value="Seed">Seed</MenuItem>
            <MenuItem value="Early Growth">Early Growth</MenuItem>
            <MenuItem value="Growth">Growth</MenuItem>
            <MenuItem value="Maturity">Maturity</MenuItem>
          </TextField>
        </div>
        <div className="col-12 col-md-4 mb-4">
          <TextField
            label="Employees Count"
            variant="filled"
            fullWidth
            name="employees_count"
            type="number"
            value={formData.employees_count || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12 col-md-4 mb-4">
          <TextField
            label="Phone Number"
            variant="filled"
            fullWidth
            name="phone_number"
            value={formData.phone_number || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12 col-md-4 mb-4">
          <TextField
            label="Email Address"
            variant="filled"
            fullWidth
            name="email_address"
            type="email"
            value={formData.email_address || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12 col-md-4 mb-4">
          <TextField
            label="Website URL"
            variant="filled"
            fullWidth
            name="website_url"
            type="url"
            value={formData.website_url || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyReviewForm;
