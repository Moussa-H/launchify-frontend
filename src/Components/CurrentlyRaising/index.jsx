// src/components/CurrentlyRaising.js
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FaTrash } from "react-icons/fa";
import "./style.css";

const CurrentlyRaising = ({
  startupId,
  currently_raising_type,
  currently_raising_size,
  investment_sources,
}) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [errors, setErrors] = useState({
    type: false,
    size: false,
    sources: false,
  });
  const [investmentSources, setInvestmentSources] = useState({
    BusinessAngel: false,
    PublicGrant: false,
    Accelerator: false,
    Corporate: false,
    VCFund: false,
    Crowd: false,
  });

  const handleOpen = () => {
    setType(currently_raising_type);
    setSize(currently_raising_size);

    // Create an object to track which sources should be checked
    const sources = {};
    investment_sources.forEach((source) => {
      sources[source.investment_source.replace(/\s+/g, "")] = true; // Map source to true
    });
  console.log("sources", sources);
    // Set all checkboxes according to the sources object
    setInvestmentSources((prevSources) => {
      const updatedSources = { ...prevSources };
      console.log("updatedSources",updatedSources);
      Object.keys(updatedSources).forEach((key) => {
        if (sources[key] !== undefined) {
          updatedSources[key] = true; // Check the checkbox if the source is present
        }
      });
      return updatedSources;
    });

    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    const isValid = validateForm();
    if (isValid) {
      // Proceed with saving the data
      console.log({ type, size, investmentSources });
      setOpen(false);
    }
  };

  const validateForm = () => {
    const hasSelectedSource = Object.values(investmentSources).some(
      (checked) => checked
    );
    const hasType = type !== "";
    const hasSize = size !== "";

    setErrors({
      type: !hasType,
      size: !hasSize,
      sources: !hasSelectedSource,
    });

    return hasType && hasSize && hasSelectedSource;
  };

  const handleCheckboxChange = (event) => {
    setInvestmentSources({
      ...investmentSources,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="row">
      {currently_raising_type !== "" ? (
        <>
          <hr className="mt-5 mb-4"></hr>
          <div className="col-12">
            <h4 className="mb-4 fs-7 ">CURRENTLY RAISING</h4>
          </div>
          <table className="table mt-1 border-0">
            <thead>
              <tr>
                <th>Investment Type</th>
                <th>Size</th>
                <th>Investment Source</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currently_raising_type}</td>
                <td>{currently_raising_size}</td>
                <td>
                  {investment_sources.map((source) => (
                    <div key={source.id}>{source.investment_source}</div>
                  ))}
                </td>
                <td>
                  <div className="btn-group">
                    <button className="btn-custom" onClick={handleOpen}>
                      Edit
                    </button>
                    <button className="btn-custom">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <div
          className="col-6 mt-5 p-4"
          style={{
            backgroundColor: "#FFF2CC",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "10px",
          }}
        >
          <h4 className="mb-4 fs-7">CURRENTLY RAISING</h4>
          <p style={{ fontSize: "14px", color: "#6D6D6D" }}>
            The external funding the project needs now.
          </p>
          <Button
            variant="contained"
            className="btn-current-round"
            onClick={handleOpen}
          >
            Set Current Round
          </Button>
        </div>
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle className="title-popup">
          Currently Raising
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="type"
            type="text"
            label="Investment Type"
            fullWidth
            variant="filled"
            value={type}
            onChange={(e) => setType(e.target.value)}
            error={errors.type} // Add this line to show error state
            helperText={errors.type && "Investment Type is required"}
          >
            <option value="Founders">Founders</option>
            <option value="Family & Friends">Family & Friends</option>
            <option value="Pre-seed">Pre-seed</option>
            <option value="Seed">Seed</option>
            <option value="Pre-series A">Pre-series A</option>
            <option value="Series A">Series A</option>
            <option value="Pre-series B">Pre-series B</option>
            <option value="Series B">Series B</option>
            <option value="Series C+">Series C+</option>
          </TextField>

          <TextField
            className="my-4"
            margin="dense"
            id="size"
            label="Size"
            type="number"
            fullWidth
            variant="filled"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            InputProps={{
              inputProps: { step: "0.01" },
            }}
            error={errors.size} // Add error state
            helperText={errors.size && "Size is required"}
          />

          <div style={{ marginTop: 16 }}>
            <p style={{ fontWeight: "bold" }}>Investment Source</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {Object.keys(investmentSources).map((source) => (
                <FormControlLabel
                  key={source}
                  control={
                    <Checkbox
                      checked={investmentSources[source]}
                      onChange={handleCheckboxChange}
                      name={source}
                    />
                  }
                  label={source
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                />
              ))}
              {errors.sources && (
                <p style={{ color: "red" }}>
                  At least one source must be selected
                </p>
              )}{" "}
              {/* Error message for checkboxes */}
            </div>
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CurrentlyRaising;
