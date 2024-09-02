// CompanyInfo.js
import React from "react";
import { TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SectorPopup from "../SectorPopup";
const CompanyInfo = ({
  formData,
  handleInputChange,
  handleAddSectorClick,
  popupOpen,
  handleClosePopup,
}) => (
  <>
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

    {/* Sector Popup */}
    {popupOpen && <SectorPopup onClose={handleClosePopup} />}
  </>
);

export default CompanyInfo;
