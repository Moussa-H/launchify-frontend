import React, { useState, useEffect } from "react";
import axios from "axios";
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
  token,
  startupId,
  currently_raising_type,
  currently_raising_size,
  investment_sources,
}) => {
  const [displayCurrentlyRaising, setDisplayCurrentlyRaising] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(currently_raising_type || "");
  const [raisingSize, setRaisingSize] = useState(currently_raising_size || "");
  const [errors, setErrors] = useState({
    type: false,
    size: false,
    sources: false,
  });

  const [investmentSources, setInvestmentSources] = useState({
    "Business Angel": false,
    "Public grant": false,
    Accelerator: false,
    Corporate: false,
    "VC Fund": false,
    Crowd: false,
  });

  const [tableData, setTableData] = useState({
    type: currently_raising_type,
    size: currently_raising_size,
    sources: investment_sources,
  });

  const handleOpen = () => {
    setType(currently_raising_type || "");
    setRaisingSize(currently_raising_size || "");

    // Map selected investment sources
    const updatedSources = { ...investmentSources };
    investment_sources.forEach((source) => {
      updatedSources[source.investment_source] = true;
    });
    setInvestmentSources(updatedSources);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({
      type: false,
      size: false,
      sources: false,
    });
  };

  const validateForm = () => {
    const hasSelectedSource = Object.values(investmentSources).some(
      (checked) => checked
    );
    const hasType = type !== "";
    const hasSize = raisingSize !== "";

    setErrors({
      type: !hasType,
      size: !hasSize,
      sources: !hasSelectedSource,
    });

    return hasType && hasSize && hasSelectedSource;
  };

  useEffect(() => {
    if (!tableData || !tableData.type || !tableData.size) {
      // Display the 'Set Current Round' view when no data exists
      setDisplayCurrentlyRaising(false);
    } else {
      // Display the table with the 'currently raising' data
      setDisplayCurrentlyRaising(true);
    }
  }, [tableData]);

const handleDelete = async () => {
  try {
    // Delete investment sources
    await axios.delete(
      `http://localhost:8000/api/investment-sources/${startupId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Delete raising info
    await axios.delete(
      `http://localhost:8000/api/startup/investinfo/${startupId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Clear the data after successful deletion
    setTableData(null); // Reset the tableData to null
  } catch (error) {
    console.error("Error occurred while deleting:", error);
  }
};


  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      // API call for investment sources
      const investmentData = {
        investment_sources: Object.keys(investmentSources)
          .filter((source) => investmentSources[source])
          .map((source) => ({ investment_source: source })),
      };
      await axios.post(
        `http://localhost:8000/api/investment-sources/${startupId}`,
        investmentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // API call for raising info
      const raiseInfoData = {
        currently_raising_type: type,
        currently_raising_size: raisingSize,
      };
      await axios.post(
        `http://localhost:8000/api/startup/investinfo/${startupId}`,
        raiseInfoData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the table data with new values
      setTableData({
        type,
        size: raisingSize,
        sources: Object.keys(investmentSources).filter(
          (source) => investmentSources[source]
        ),
      });

      setOpen(false);
    } catch (error) {
      console.error("Error occurred while saving:", error);
    }
  };

  const handleCheckboxChange = (event) => {
    setInvestmentSources({
      ...investmentSources,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="row">
      {displayCurrentlyRaising ? (
        <>
          <hr className="mt-5 mb-4"></hr>
          <div className="col-12">
            <h4 className="mb-4 fs-7">CURRENTLY RAISING</h4>
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
                <td>{tableData?.type}</td>
                <td>{tableData?.size}</td>
                <td>
                  {tableData?.sources.map((source, index) => (
                    <div key={index}>{source}</div>
                  ))}
                </td>
                <td>
                  <div className="btn-group">
                    <button className="btn-custom" onClick={handleOpen}>
                      Edit
                    </button>
                    <button className="btn-custom" onClick={handleDelete}>
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

      {/* Popup dialog for editing */}
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
            label="Investment Type"
            variant="filled"
            fullWidth
            name="investment_type"
            select
            value={type}
            onChange={(e) => setType(e.target.value)}
            error={errors.type}
            helperText={errors.type && "Investment Type is required"}
          >
            <MenuItem value="">Select Type</MenuItem>
            <MenuItem value="Founders">Founders</MenuItem>
            <MenuItem value="Family & Friends">Family & Friends</MenuItem>
            <MenuItem value="Pre-seed">Pre-seed</MenuItem>
            <MenuItem value="Seed">Seed</MenuItem>
            <MenuItem value="Pre-series A">Pre-series A</MenuItem>
            <MenuItem value="Series A">Series A</MenuItem>
            <MenuItem value="Pre-series B">Pre-series B</MenuItem>
            <MenuItem value="Series B">Series B</MenuItem>
            <MenuItem value="Series C+">Series C+</MenuItem>
          </TextField>

          <TextField
            className="my-4"
            margin="dense"
            id="size"
            label="Size"
            type="number"
            fullWidth
            variant="filled"
            value={raisingSize}
            onChange={(e) => setRaisingSize(e.target.value)}
            InputProps={{
              inputProps: { step: "0.01" },
            }}
            error={errors.size}
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
                  label={source}
                />
              ))}
              {errors.sources && (
                <p style={{ color: "red" }}>
                  At least one source must be selected
                </p>
              )}
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
