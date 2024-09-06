// src/components/CurrentlyRaisingPopup.js
import React from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CurrentlyRaisingPopup = ({
  open,
  handleClose,
  handleSave,
  type,
  setType,
  size,
  setSize,
  investmentSources,
  handleCheckboxChange,
  errors,
}) => {
  return (
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
          error={errors.type}
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
                label={source
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
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
  );
};

export default CurrentlyRaisingPopup;
